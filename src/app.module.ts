import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorsModule } from './Errors/Errors.module';
import { MessagingModule } from './Messaging/messaging.module';
import { NotificationModule } from './Notification/notification.module';
import { TransactionModule } from './Transaction/transaction.module';
import { UsersModule } from './Users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URI],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    ErrorsModule,
    MessagingModule,
    UsersModule,
    TransactionModule,
    NotificationModule,
  ],
  providers: [],
})
export class AppModule {}
