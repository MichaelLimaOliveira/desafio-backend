import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import MongooseExeptionHandlerService from 'src/Errors/MongooseExepitionHandler.service';
import { Transaction } from 'src/Transaction/entities/Transaction.entity';
import ITransactionRepository from '../Transaction.repository.interface';

class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectModel('Transaction')
    private readonly transactionRepository: Model<Transaction>,
    private readonly mongooseExeptionHandlerService: MongooseExeptionHandlerService,
  ) {}

  async save(transaction: Transaction) {
    try {
      const createdUser = new this.transactionRepository(transaction);
      await createdUser.save();
    } catch (error: any) {
      this.mongooseExeptionHandlerService.handlerError(error);
    }
  }

  async getAll() {
    return await this.transactionRepository.find().exec();
  }
}

export default TransactionRepository;
