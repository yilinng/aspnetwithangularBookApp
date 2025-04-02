import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  BookEntry,
  LoginResponseEntry,
  NewBookEntry,
  UserEntry,
} from '../types/types';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private bookUrl = 'https://localhost:5001/api/books'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  token = '';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private storageService: StorageService
  ) {
    this.getToken();
  }

  //https://v14.angular.io/tutorial/toh-pt4
  getBooks(): Observable<BookEntry[]> {
    return this.http.get<BookEntry[]>(this.bookUrl).pipe(
      tap((_) => this.log('fetched books')),
      catchError(this.handleError<BookEntry[]>('getBooks', []))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getBookNo404<Data>(id: number): Observable<BookEntry> {
    const url = `${this.bookUrl}/?id=${id}`;
    return this.http.get<BookEntry[]>(url).pipe(
      map((books) => books[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<BookEntry>(`getBook id=${id}`))
    );
  }

  getBook(id: number): Observable<BookEntry> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const url = `${this.bookUrl}/${id}`;
    return this.http.get<BookEntry>(url).pipe(
      tap((_) => this.log(`fetched book id=${id}`)),
      catchError(this.handleError<BookEntry>(`getBook id=${id}`))
    );
  }

  /** POST: add a new hero to the server */
  addBook(book: NewBookEntry): Observable<BookEntry> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.token);

    console.log('token', this.token);

    console.log('addBook httpOptions', headers);
    return this.http.post<BookEntry>(this.bookUrl, book, { headers: headers });
  }

  /** PUT: update the hero on the server */
  updateBook(book: BookEntry): Observable<any> {
    const url = `${this.bookUrl}/${book.book_Id}`;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.token);

    console.log('token', this.token);

    console.log('updateBook httpOptions', headers);

    return this.http.put(url, book, { headers: headers });
  }

  /** DELETE: delete the hero from the server */
  deleteBook(id: number): Observable<BookEntry> {
    const url = `${this.bookUrl}/${id}`;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.token);

    console.log('token', this.token);

    console.log('deleteBook httpOptions', headers);

    return this.http.delete<BookEntry>(url, { headers: headers });
  }

  getToken() {
    let isLoggedIn = this.storageService.isLoggedIn();
    if (isLoggedIn) {
      const user = this.storageService.getUser();
      console.log('user', user);
      this.token = user.value.refreshToken;
    }
  }

  /* GET heroes whose name contains search term */
  searchBooks(term: string): Observable<BookEntry[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<BookEntry[]>(`${this.bookUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found books matching "${term}"`)
          : this.log(`no books matching "${term}"`)
      ),
      catchError(this.handleError<BookEntry[]>('searchBooks', []))
    );
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
