import { Account } from '@app/entities/account';
import { FinancialTransaction } from '@app/entities/financial-transaction';
import Decimal from 'decimal.js';
import { random, lorem } from "faker";

export class FinancialTransactionStub extends FinancialTransaction {
  public constructor(
    identifier: string,
    source: Account,
    target: Account,
    amount: Decimal,
    description: string,
    createdAt: Date,
  ) {
    super(
      identifier,
      source,
      target,
      amount,
      description,
      createdAt,
    );
  }

  public static new(): FinancialTransactionStub {
    return new FinancialTransactionStub(
      random.uuid(),
      { identifier: random.uuid() },
      { identifier: random.uuid() },
      new Decimal(random.number(100)),
      lorem.sentence(5),
      new Date(),
    );
  }
}
