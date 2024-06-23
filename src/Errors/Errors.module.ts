import { Global, Module } from '@nestjs/common';
import MongooseExeptionHandlerService from './MongooseExepitionHandler.service';

@Global()
@Module({
  providers: [MongooseExeptionHandlerService],
  exports: [MongooseExeptionHandlerService],
})
export class ErrorsModule {}
