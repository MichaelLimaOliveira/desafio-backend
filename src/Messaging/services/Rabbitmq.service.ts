import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService {
  private readonly queue = 'transactions_queue';
  private readonly url =
    process.env.RABBITMQ_URI || 'amqp://user:password@localhost:5672';

  async sendTransaction(transaction: any): Promise<void> {
    try {
      const connection = await amqp.connect(this.url);
      const channel = await connection.createChannel();
      await channel.assertQueue(this.queue, { durable: true });
      channel.sendToQueue(
        this.queue,
        Buffer.from(JSON.stringify(transaction)),
        {
          persistent: true,
        },
      );
      console.log('Transaction sent:', transaction);
      await channel.close();
      await connection.close();
    } catch (error) {
      console.error('Error sending transaction to RabbitMQ:', error);
    }
  }
}
