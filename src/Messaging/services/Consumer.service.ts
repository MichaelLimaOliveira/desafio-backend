import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import TransactionService from 'src/Transaction/services/Transaction.service';

@Injectable()
export class ConsumerService implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly transactionService: TransactionService) {}

  private readonly queue = process.env.TRANSACTION_QUEUE;
  private readonly url = process.env.RABBITMQ_URI;
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async onModuleInit() {
    this.connection = await amqp.connect(this.url);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue, { durable: true });
    this.consumeMessages();
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }

  private async consumeMessages() {
    this.channel.consume(this.queue, async (message) => {
      if (message !== null) {
        const transaction = JSON.parse(message.content.toString());
        console.log('Received transaction:', transaction);

        await this.processTransaction(transaction);

        this.channel.ack(message);
      }
    });
  }

  private async processTransaction(transaction: any) {
    return this.transactionService.consolidateTransaction(transaction);
  }
}
