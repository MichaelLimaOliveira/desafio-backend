import { Transaction } from '../entities/Transaction.entity';

abstract class ITransactionRepository {
  abstract save(transaction: Transaction);
  abstract getAll();
}

export default ITransactionRepository;
