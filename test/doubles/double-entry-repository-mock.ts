import { Description } from '@app/common/description';
import { Identifier } from '@app/common/identifier';
import { Account } from '@app/entities/account';
import { Balance } from '@app/entities/balance';
import { FinancialTransaction } from '@app/entities/financial-transaction';
import { DoubleEntryRepository } from '@app/repositories/double-entry';
import Decimal from 'decimal.js';

interface LedgerEntry {
  identifier: Identifier;
  account: Account;
  counterpart: Account;
  credit: Decimal | null;
  debit: Decimal | null;
  description: Description;
  createdAt: Date;
}

export class DoubleEntryRepositoryMock implements DoubleEntryRepository {
  private entries: LedgerEntry[] = [];

  private sumEntries(entries: LedgerEntry[], column: "credit" | "debit"): Decimal {
    return entries.reduce((sum, entry) => sum.add(entry[column] || 0), new Decimal(0))
  }

  public async add(financialTransaction: FinancialTransaction, side: "CREDIT" | "DEBIT"): Promise<boolean> {
    this.entries.push({
      identifier: financialTransaction.identifier,
      account: financialTransaction.source,
      counterpart: financialTransaction.target,
      credit: side === "CREDIT" ? financialTransaction.amount : null,
      debit: side === "DEBIT" ? financialTransaction.amount : null,
      description: financialTransaction.description,
      createdAt: financialTransaction.createdAt,
    });

    return true;
  }

  public async balance(account: Account): Promise<Balance> {
    const statement = this.entries.filter((entry) => entry.account.identifier === account.identifier);

    const credit = this.sumEntries(statement, "credit");
    const debit = this.sumEntries(statement, "debit");
    const total = credit.sub(debit);

    const counterparts = statement.map((entry) => entry.counterpart.identifier);
    
    const counterStatements = this.entries.filter((entry) =>
      counterparts.includes(entry.account.identifier) && entry.counterpart === account.identifier,
    );

    // If an account WILL be debited, this money IS NOT available, regardless of the counterpart
    // If an account HAVE BEEN credited, this money IS available, in regards to the counterpart
    const consolidatedCredit = this.sumEntries(counterStatements, "debit");
    const available = consolidatedCredit.sub(debit);

    return { available, total };
  }
}