import Decimal from 'decimal.js';
import { Identifier } from '@app/common/identifier';
import { Description } from '@app/common/description';
import { Account } from '@app/entities/account';

export class FinancialTransaction {
  public constructor(
    public identifier: Identifier,
    public source: Account,
    public target: Account,
    public amount: Decimal,
    public description: Description,
    public createdAt: Date,
  ) {}

  public counterpart(): FinancialTransaction {
    return new FinancialTransaction(
      this.identifier,
      this.target,
      this.source,
      this.amount,
      this.description,
      this.createdAt,
    );
  }

  public revert(): FinancialTransaction {
    [this.source, this.target] = [this.target, this.source];
    this.amount = this.amount.times(-1);

    return this;
  }
}