import { Role } from "./role";

export class User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string | undefined;
  roles: Role[];
  createDate: string;
  active: boolean;
}
