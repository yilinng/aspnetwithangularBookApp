import { Injectable } from '@angular/core';
import { BookEntry } from '../types/types';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  //role is admin or user which is created books

  public isAdmin(): boolean {
    const user = this.getUser();
    if (user && user.value?.role === 0) {
      return true;
    }

    return false;
  }

  public isUser(book: BookEntry): boolean {
    const user = this.getUser();
    if (user && book.user_Id === user.value?.id) {
      return true;
    }
    return false;
  }
}
