import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../user';
import { LocalAuthGuard } from 'src/core/guards';
import { UserPayload } from './interfaces/payload.interface';
import { User } from './decorators/payload.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async signup(@Body() dto: CreateUserDto) {
    const hasUser = await this.userService.hasUser();
    if (hasUser) {
      throw new ForbiddenException();
    }
    const user = await this.userService.createUser(dto);
    const { uuid, name, role } = user;
    return this.authService.generateJwt({ uuid, name, role });
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signin(@User() user: UserPayload) {
    return this.authService.generateJwt(user);
  }
}
