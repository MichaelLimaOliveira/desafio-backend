import { Module } from '@nestjs/common';
import IUserRepository from './repositories/User.repository.interface';
import UserRepository from './repositories/mongose/User.repository';
import UserService from './services/User.service';

@Module({
  imports: [],
  controllers: [],
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
