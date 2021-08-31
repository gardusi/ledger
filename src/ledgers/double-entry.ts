import { FinancialTransaction } from '@app/entities/financial-transaction';
import { DoubleEntryRepository } from '@app/repositories/double-entry';

export class DoubleEntryLedger {
  public constructor(
    private doubleEntryRepository: DoubleEntryRepository,
  ) {}

  private async credit(financialTransaction: FinancialTransaction): Promise<void> {

  }

  private async debit(financialTransaction: FinancialTransaction): Promise<void> {

  }

  public async authorize(financialTransaction: FinancialTransaction): Promise<void> {

  }

  public async cancel(financialTransaction: FinancialTransaction): Promise<void> {

  }

  public async commit(financialTransaction: FinancialTransaction): Promise<void> {

  }

  public async execute(financialTransaction: FinancialTransaction): Promise<void> {
    if (financialTransaction.amount.greaterThanOrEqualTo(0)) {
      financialTransaction = financialTransaction.revert();
    }

    await this.doubleEntryRepository.add(financialTransaction, "CREDIT");
    await this.doubleEntryRepository.add(financialTransaction.counterpart(), "DEBIT");
  }
}