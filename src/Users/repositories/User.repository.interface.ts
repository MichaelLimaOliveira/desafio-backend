import { Users } from '../entities/Users.entity';

abstract class IUserRepository {
  abstract findUserByDocument(document: string): Promise<Users>;
  abstract findUserById(id: string): Promise<Users>;
  abstract findUserByEmail(email: string): Promise<Users>;
  abstract save(user: Users): void;
}

export default IUserRepository;
