import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() user: CreateUserDto) {
    if (!user) {
      return { message: 'User not found' };
    }

    return await this.userService.createUser(user);
  }
}
