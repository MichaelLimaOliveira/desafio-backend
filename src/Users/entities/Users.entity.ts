import UserType from './UserType.enum';

class Users {
  id: string;

  firstName: string;

  lastName: string;

  document: string;

  email: string;

  password: string;

  balance: number;

  userType: UserType;
}

export default Users;
