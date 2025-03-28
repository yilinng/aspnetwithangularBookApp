import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BookEntry, NewBookEntry } from '../types/types';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private bookUrl = 'https://localhost:5001/api/books'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

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
    return this.http.post<BookEntry>(this.bookUrl, book, this.httpOptions).pipe(
      tap((newBook: BookEntry) =>
        this.log(`added book w/ id=${newBook.book_Id}`)
      ),
      catchError(this.handleError<BookEntry>('addBook'))
    );
  }

  /** PUT: update the hero on the server */
  updateBook(book: BookEntry): Observable<any> {
    const url = `${this.bookUrl}/${book.book_Id}`;

    return this.http.put(url, book, this.httpOptions).pipe(
      tap((_) => this.log(`updated book id=${book.book_Id}`)),
      catchError(this.handleError<any>('updateBook'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteBook(id: number): Observable<BookEntry> {
    const url = `${this.bookUrl}/${id}`;

    return this.http.delete<BookEntry>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted book id=${id}`)),
      catchError(this.handleError<BookEntry>('deleteBook'))
    );
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
