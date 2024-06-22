import Users from '../entities/Users.entity';

abstract class IUserRepository {
  abstract findUserByDocument(document: string): Users;
  abstract findUserById(id: string): Users;
  abstract save(user: Users): void;
}

export default IUserRepository;
