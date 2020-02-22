import { FinancialTransactionStub } from '@test/doubles/financial-transaction-stub';
import { DoubleEntryLedger } from '@app/ledgers/double-entry';
import { DoubleEntryRepositoryMock } from '@test/doubles/double-entry-repository-mock';
import { expect } from "chai";

describe("Double Entry Ledger", () => {
  it("Executes a Financial Transaction", async () => {
    const financialTransaction = FinancialTransactionStub.new();

    const repository = new DoubleEntryRepositoryMock();
    const ledger = new DoubleEntryLedger(repository);

    await ledger.execute(financialTransaction);

    expect(repository.balance(financialTransaction.target)).to.be.equal({
      available: financialTransaction.amount,
      total: financialTransaction.amount,
    })
  });
});
