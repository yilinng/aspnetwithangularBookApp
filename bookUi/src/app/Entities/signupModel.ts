import { NewUserEntry, RoleEntry } from '../types/types';

export class SignupModel implements NewUserEntry {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public role: RoleEntry
  ) {}
}
