import Users from '../../entities/Users.entity';
import IUserRepository from '../User.repository.interface';

class UserRepository implements IUserRepository {
  save(user: Users): void {
    console.log(user);
  }

  findUserByDocument(document: string): Users {
    console.log(document);
    return new Users();
  }

  findUserById(id: string): Users {
    console.log(id);
    return new Users();
  }
}

export default UserRepository;
