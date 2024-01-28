import {
  IsNotEmpty,
  //   IsEmail,
  //   IsEnum,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(60)
  public readonly name: string;

  @MinLength(3)
  @MaxLength(125)
  public readonly password: string;

  @IsNotEmpty()
  public readonly email: string;

  public readonly role: Role;
}
