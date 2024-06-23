import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/Users/entities/Users.entity';

import MongooseExeptionHandlerService from 'src/Errors/MongooseExepitionHandler.service';
import IUserRepository from '../User.repository.interface';

class UserRepository implements IUserRepository {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>,
    private readonly mongooseExeptionHandlerService: MongooseExeptionHandlerService,
  ) {}

  async save(user: Users): Promise<void> {
    try {
      const createdUser = new this.usersModel(user);
      await createdUser.save();
    } catch (error: any) {
      this.mongooseExeptionHandlerService.handlerError(error);
    }
  }

  async findUserByDocument(document: string): Promise<Users> {
    try {
      return this.usersModel.findOne({ document }).exec();
    } catch (error: any) {
      this.mongooseExeptionHandlerService.handlerError(error);
    }
  }

  async findUserById(id: string): Promise<Users> {
    try {
      const user = await this.usersModel.findById(id).exec();

      return user;
    } catch (error: any) {
      this.mongooseExeptionHandlerService.handlerError(error);
    }
  }

  async findUserByEmail(email: string): Promise<Users> {
    try {
      const user = await this.usersModel.findOne({ email }).exec();
      return user;
    } catch (error: any) {
      this.mongooseExeptionHandlerService.handlerError(error);
    }
  }
}

export default UserRepository;
