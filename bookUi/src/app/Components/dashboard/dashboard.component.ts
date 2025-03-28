import { Component, OnInit } from '@angular/core';
import { BookEntry } from 'src/app/types/types';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  books: BookEntry[] = [];
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe((books) => {
      console.log('get book', books);
      this.books = books.slice(0, 3);
    });
  }

  stringLength(str: string): string {
    if (str.length > 50) {
      return str.substring(0, 50) + '...';
    } else {
      return str;
    }
  }
}
