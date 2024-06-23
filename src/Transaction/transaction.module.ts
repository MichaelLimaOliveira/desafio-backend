import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagingModule } from 'src/Messaging/messaging.module';
import { NotificationModule } from 'src/Notification/notification.module';
import { UsersModule } from 'src/Users/users.module';
import { TransactionController } from './Transaction.controller';
import TransactionModel from './entities/Transaction.entity';
import ITransactionRepository from './repositories/Transaction.repository.interface';
import TransactionRepository from './repositories/mongose/Transaction.repository.interface';
import TransactionService from './services/Transaction.service';

@Module({
  imports: [
    UsersModule,
    NotificationModule,
    forwardRef(() => MessagingModule),
    MongooseModule.forFeature([
      { name: 'Transaction', schema: TransactionModel.schema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    {
      provide: ITransactionRepository,
      useClass: TransactionRepository,
    },
  ],
  exports: [TransactionService],
})
export class TransactionModule {}
