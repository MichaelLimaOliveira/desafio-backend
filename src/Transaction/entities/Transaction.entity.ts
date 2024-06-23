import { getModelForClass, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Users } from 'src/Users/entities/Users.entity';

export class Transaction {
  @prop({ required: true, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @prop({ required: true })
  amount: number;

  @prop({ required: true, ref: () => Users })
  sender: Users;

  @prop({ required: true, ref: () => Users })
  receiver: Users;

  @prop({ required: true, default: () => new Date() })
  timestamp: Date;
}

const TransactionModel = getModelForClass(Transaction);
export default TransactionModel;
