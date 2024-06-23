import { Module, forwardRef } from '@nestjs/common';
import { TransactionModule } from 'src/Transaction/transaction.module';
import { RabbitmqController } from './rabbitmq.controller';
import { ConsumerService } from './services/Consumer.service';
import { RabbitmqService } from './services/Rabbitmq.service';

@Module({
  imports: [forwardRef(() => TransactionModule)],
  providers: [RabbitmqService, ConsumerService],
  controllers: [RabbitmqController],
  exports: [RabbitmqService],
})
export class MessagingModule {}
