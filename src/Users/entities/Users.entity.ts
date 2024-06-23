import { getModelForClass, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import UserDTO from '../User.dto';
import UserType from './UserType.enum';

export class Users {
  @prop({ required: true, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ required: true, unique: true })
  document: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, default: 0 })
  balance: number;

  @prop({ required: true, enum: UserType })
  userType: UserType;

  constructor(userDTO: UserDTO) {
    this._id = new Types.ObjectId();
    this.firstName = userDTO.firstName;
    this.lastName = userDTO.lastName;
    this.document = userDTO.document;
    this.email = userDTO.email;
    this.password = userDTO.password;
    this.balance = userDTO.balance;
    this.userType = userDTO.userType;
  }

  static createUser(userDTO: UserDTO) {
    return new Users(userDTO);
  }
}

const UsersModel = getModelForClass(Users);

export default UsersModel;
