import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CommonUtility } from '../../core/util/common.utility';

import { UserPayload } from './interfaces/payload.interface';

import { UserService } from '../user';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  public async validateUser(username: string, password: string) {
    const result = await this.userService.findUser(username);
    // 確保返回的是單個用戶實體
    if (!Array.isArray(result) && result) {
      const user = result;
      const { hash } = CommonUtility.encryptBySalt(password, user.passwordSalt);
      //判斷hash的正確性
      if (hash == user.passwordHash) {
        return user;
      }
    }
    return null;
  }

  public async generateJwt(payload: UserPayload) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
