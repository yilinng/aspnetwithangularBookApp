import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/app/Services/message.service';
import { BookEntry } from 'src/app/types/types';
import { BookService } from '../../Services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: BookEntry[] = [];

  selectedBook?: BookEntry;
  @Input() book?: BookEntry;

  constructor(
    private bookService: BookService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getBooks();
    console.log('books com work');
  }

  onSelect(book: BookEntry): void {
    this.selectedBook = book;
    this.messageService.add(`BooksComponent: Selected book id ${book.book_Id}`);
  }

  stringLength(str: string): string {
    if (str.length > 50) {
      return str.substring(0, 50) + '...';
    } else {
      return str;
    }
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe((books) => (this.books = books));
  }

  add(): void {
    if (!this.book) {
      return;
    }

    let title = this.book.title.trim();
    let author = this.book.author.trim();
    let price = Number(this.book.price);

    if (!title || !author || price == 0) {
      return;
    }

    this.bookService.addBook(this.book).subscribe((book) => {
      this.books.push(book);
    });
  }

  delete(book: BookEntry): void {
    this.books = this.books.filter((h) => h !== book);
    this.bookService.deleteBook(book.book_Id).subscribe();
  }
}
