export interface BookEntry {
  book_Id: number;
  title: string;
  author: string;
  price: number;
  user_Id: UserEntry['user_Id'];
}

export interface UserEntry {
  user_Id: number;
  username: string;
  email: string;
  password: string;
  books?: Array<BookEntry['book_Id']>;
  role: RoleEntry;
}

export interface UserResponseEntry {
  username: string;
  email: string;
  message: string;
}

export interface LoginResponseEntry extends UserResponseEntry {
  user_Id: UserEntry['user_Id'];
  refreshToken: string;
}

export interface SignupResponseEntry extends UserResponseEntry {}

export enum RoleEntry {
  Administrator = 0,
  User = 1,
}

export type UserInformation = Omit<UserEntry, 'password' | 'user_Id'>;

export type NewUserEntry = Omit<UserEntry, 'user_Id' | 'books'>;

export type LoginEntry = Omit<UserEntry, 'user_Id' | 'books' | 'username'>;

export type NewBookEntry = Omit<BookEntry, 'book_Id'>;
