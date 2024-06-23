import UserType from './entities/UserType.enum';

class UserDTO {
  readonly firstName: string;

  readonly lastName: string;

  readonly document: string;

  readonly email: string;

  readonly password: string;

  readonly balance: number;

  readonly userType: UserType;
}

export default UserDTO;
