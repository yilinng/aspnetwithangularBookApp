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
}

export type UserInformation = Omit<UserEntry, 'password' | 'user_Id'>;

export type NewLoginUserEntry = Omit<UserEntry, 'user_Id'>;

export type NewBookEntry = Omit<BookEntry, 'book_Id' | 'user_Id'>;
