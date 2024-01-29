import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findUsers() {
    return await this.userService.findUser();
  }

  @Post('create')
  async createUser(@Body() user: CreateUserDto) {
    if (!user) {
      return { message: 'User not found' };
    }

    return await this.userService.createUser(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() userdata: UpdateUserDto) {
    return await this.userService.updateUser(id, userdata);
  }
}
