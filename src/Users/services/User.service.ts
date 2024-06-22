import { Injectable } from '@nestjs/common';
import UserType from '../entities/UserType.enum';
import Users from '../entities/Users.entity';
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

  public findUserById(id: string): Users {
    return this.userRepository.findUserById(id);
  }

  public saveUser(user: Users) {
    this.userRepository.save(user);
  }
}

export default UserService;
