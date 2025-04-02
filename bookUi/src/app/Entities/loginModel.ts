import { LoginEntry, RoleEntry } from '../types/types';

export class LoginModel implements LoginEntry {
  constructor(
    public email: string,
    public password: string,
    public role: RoleEntry
  ) {}
}
