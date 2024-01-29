import { Role } from '../../../common/enums/role.enum';

export interface UserPayload {
  uuid: string;
  name: string;
  role: Role;
}
