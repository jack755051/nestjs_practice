import { Role } from '../../../common/enums/role.enum';

export interface UserPayload {
  uuid: string;
  username: string;
  role: Role;
}
