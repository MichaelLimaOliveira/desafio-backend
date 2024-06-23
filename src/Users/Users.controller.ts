import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import UserDTO from './User.dto';
import UserService from './services/User.service';

@Controller('users')
class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  save(@Body() user: UserDTO) {
    return this.usersService.saveUser(user);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    console.log(id);
    return this.usersService.findUserById(id);
  }
}

export default UsersController;
