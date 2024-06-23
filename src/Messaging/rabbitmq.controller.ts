import { Body, Controller, Post } from '@nestjs/common';
import { RabbitmqService } from './services/Rabbitmq.service';

@Controller('rabbitmq')
export class RabbitmqController {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  @Post('send-transaction')
  async sendTransaction(
    @Body('sender') sender: string,
    @Body('receiver') receiver: string,
    @Body('amount') amount: number,
  ) {
    const transaction = {
      sender,
      receiver,
      amount,
      timestamp: new Date().toISOString(),
    };
    await this.rabbitmqService.sendTransaction(transaction);
    return { status: 'Transaction sent successfully' };
  }
}
