import { BadRequestException, Injectable } from '@nestjs/common';
import UserDTO from '../User.dto';
import UserType from '../entities/UserType.enum';

import { Users } from '../entities/Users.entity';
import IUserRepository from '../repositories/User.repository.interface';

@Injectable()
class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public validateTransaction(sender: Users, amount: number): void {
    if (sender.userType == UserType.MERCHANT) {
      throw new Error(
        'Usuário do tipo lojista não está autorizado a realizar transação.',
      );
    }

    if (sender.balance < amount) {
      throw new Error('Saldo insuficiente');
    }
  }

  public async findUserById(id: string): Promise<Users> {
    const user = await this.userRepository.findUserById(id);
    return user;
  }

  public async saveUser(user: UserDTO) {
    const existsUserByDocument = await this.userRepository.findUserByDocument(
      user.document,
    );
    if (existsUserByDocument)
      throw new BadRequestException('Documento já cadastrado');

    const existsUserByEmail = await this.userRepository.findUserByEmail(
      user.email,
    );

    if (existsUserByEmail) throw new BadRequestException('Email já cadastrado');

    const newUser = Users.createUser(user);

    return this.userRepository.save(newUser);
  }

  public async transferBalance(
    sender: Users,
    receiver: Users,
    transactionAmount: number,
  ) {
    this.validateTransaction(sender, transactionAmount);
    sender.balance -= transactionAmount;
    receiver.balance += transactionAmount;

    this.userRepository.save(sender);
    this.userRepository.save(receiver);
  }
}

export default UserService;
