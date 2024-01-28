import { UserEntity } from './../../typeorm/entities/user.entity';
import { CommonUtility } from './../../core/util/common.utility';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  /**
   * 創建使用者
   * @param user 使用者信息
   * @returns
   */
  public async createUser(user: CreateUserDto) {
    const { name, password, email, role } = user;
    const { hash, salt } = CommonUtility.encryptBySalt(password);

    const newUser = this.userRepository.create({
      uuid: uuidv4(),
      role: role,
      name: name,
      passwordSalt: salt,
      passwordHash: hash,
      email: email,
      createAt: new Date(),
    });

    return this.userRepository.save(newUser);
  }

  /**
   * 有name回傳該user資料
   * 沒有name則回傳所有user資料
   * @param name
   * @returns
   */
  public async findUser(name?: string) {
    if (name) {
      return await this.userRepository.findOne({ where: { name } });
    } else {
      return await this.userRepository.find();
    }
  }

  /**
   * 布爾值，判斷是否有這個user
   * @returns
   */
  public async hasUser() {
    const count = await this.userRepository.count();
    return count > 0;
  }
}
