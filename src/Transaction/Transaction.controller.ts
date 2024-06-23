import { Body, Controller, Get, Post } from '@nestjs/common';
import TransactionDTO from './dtos/Transaction.dto';
import TransactionService from './services/Transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('create-transaction')
  async sendTransaction(@Body() transaction: TransactionDTO) {
    await this.transactionService.createTransaction(transaction);
    return { status: 'Transaction sent successfully' };
  }

  // apenas para tests não faz parte do sistema
  @Get()
  async getAll() {
    return this.transactionService.getAll();
  }
}
