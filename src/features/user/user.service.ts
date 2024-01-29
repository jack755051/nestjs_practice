import { UpdateUserDto } from './dto/update-user.dto';
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

  public async deleteUser(uuid: string) {
    await this.userRepository.delete({ uuid: uuid });
    return {};
  }

  /**
   * 更新user資訊
   * @param uuid
   * @param data
   * @returns
   */
  public async updateUser(uuid: string, data: UpdateUserDto) {
    //找到欲修改的user
    const user = await this.userRepository.findOne({ where: { uuid } });
    const { name, password, email, role } = data;
    //處理密碼
    const { hash, salt } = CommonUtility.encryptBySalt(password);

    // await this.userRepository.update({ name: user.name }, { name: name });

    // await this.userRepository.update(
    //   { passwordHash: user.passwordHash },
    //   { passwordHash: hash },
    // );

    // await this.userRepository.update(
    //   { passwordSalt: user.passwordSalt },
    //   { passwordSalt: salt },
    // );

    // await this.userRepository.update({ email: user.email }, { email: email });
    // await this.userRepository.update({ role: user.role }, { role: role });

    // 使用一次 update 調用來更新所有字段
    await this.userRepository.update(
      { uuid },
      {
        name: name,
        passwordHash: hash,
        passwordSalt: salt,
        email: email,
        role: role,
      },
    );

    return this.userRepository.save(user);
  }
}
