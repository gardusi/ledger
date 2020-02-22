import { FinancialTransaction } from '@app/entities/financial-transaction';
import { Account } from '@app/entities/account';
import { Balance } from '@app/entities/balance';

export interface DoubleEntryRepository {
  add(financialTransaction: FinancialTransaction, side: "CREDIT" | "DEBIT"): Promise<boolean>;
  balance(account: Account): Promise<Balance>;
}