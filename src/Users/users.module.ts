import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import UsersController from './Users.controller';
import UsersModel from './entities/Users.entity';
import IUserRepository from './repositories/User.repository.interface';
import UserRepository from './repositories/mongose/User.repository';
import UserService from './services/User.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersModel.schema }]),
  ],
  controllers: [UsersController],
  providers: [
    UserService,

    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UsersModule {}
