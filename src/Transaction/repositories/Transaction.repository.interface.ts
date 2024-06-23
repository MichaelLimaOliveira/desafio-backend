import { Transaction } from '../entities/Transaction.entity';

abstract class ITransactionRepository {
  abstract save(transaction: Transaction);

  // apenas para tests não faz parte do sistema
  abstract getAll();
}

export default ITransactionRepository;
