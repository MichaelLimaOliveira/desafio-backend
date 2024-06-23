import { Injectable } from '@nestjs/common';
import { RabbitmqService } from 'src/Messaging/services/Rabbitmq.service';
import NotificationService from 'src/Notification/services/Notification.service';
import UserService from 'src/Users/services/User.service';
import TransactionDTO from '../dtos/Transaction.dto';
import { Transaction } from '../entities/Transaction.entity';
import ITransactionRepository from '../repositories/Transaction.repository.interface';

@Injectable()
class TransactionService {
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
    private readonly rabbitmqService: RabbitmqService,
  ) {}

  public async createTransaction(transactionDTO: TransactionDTO) {
    const sender = await this.userService.findUserById(transactionDTO.senderId);
    const receiver = await this.userService.findUserById(
      transactionDTO.receiverId,
    );

    this.userService.validateTransaction(sender, transactionDTO.amount);

    if (!this.authorizeTransaction()) {
      throw new Error('Transação mão autorizada');
    }

    const transaction = new Transaction();

    transaction.amount = transactionDTO.amount;
    transaction.sender = sender;
    transaction.receiver = receiver;

    this.rabbitmqService.sendTransaction(transaction);
  }

  public async consolidateTransaction(transaction: Transaction) {
    const sender = await this.userService.findUserById(
      String(transaction.sender._id),
    );
    const receiver = await this.userService.findUserById(
      String(transaction.receiver._id),
    );

    this.userService.transferBalance(sender, receiver, transaction.amount);

    this.transactionRepository.save(transaction);

    this.notificationService.sendNotification(
      sender,
      'Tranferencia realizadas',
    );

    this.notificationService.sendNotification(
      receiver,
      'Tranferencia recebida',
    );

    return transaction;
  }

  public async authorizeTransaction() {
    // mock para um outro sistema que valida a transação
    return true;
  }

  // apenas para tests não faz parte do sistema
  async getAll() {
    return await this.transactionRepository.getAll();
  }
}

export default TransactionService;
