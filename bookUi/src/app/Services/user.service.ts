import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  UserEntry,
  NewUserEntry,
  LoginEntry,
  LoginResponseEntry,
  SignupResponseEntry,
} from '../types/types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})

//https://www.reddit.com/r/angular/comments/173nkke/how_to_store_and_delete_the_cookies_in_angular_16/
/*
If you're talking about an authentication/authorization token (e.g. JWT), it should be set on the server, not on the client. It should be marked secure and http-only so that it cannot be manipulated by JavaScript or easily intercepted by man in the middle attacks. This also means that the JavaScript Cookie API cannot be used on it.

If you're not talking about authentication/authorization then you should probably use Local storage instead.

If you really want to use cookies, look at the JavaScript Cookie API.
*/
export class UserService {
  private bookUrl = 'https://localhost:5001/api/'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** POST: add a new user to the server */
  register(user: NewUserEntry): Observable<SignupResponseEntry> {
    const url = this.bookUrl + 'signup';
    return this.http.post<SignupResponseEntry>(url, user, this.httpOptions);
  }

  /** POST: login  to the server */
  login(user: LoginEntry): Observable<LoginResponseEntry> {
    const url = this.bookUrl + 'login';
    return this.http.post<LoginResponseEntry>(url, user, this.httpOptions);
  }

  logout(): Observable<any> {
    const url = this.bookUrl + 'auth/logout';
    return this.http.post(url, {}, this.httpOptions);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a BookService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BookService: ${message}`);
  }
}
