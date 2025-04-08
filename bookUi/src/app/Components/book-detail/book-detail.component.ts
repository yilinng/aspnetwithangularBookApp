import { Component, OnInit, Input } from '@angular/core';
import { BookEntry } from 'src/app/types/types';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from 'src/app/Services/book.service';
import { StorageService } from 'src/app/Services/storage.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  @Input() book?: BookEntry;
  isLoggedIn = false;
  isAdmin = false;
  showEdit = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private storageService: StorageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.isAdmin = this.storageService.isAdmin();
    this.getBook();
    console.log('book detail com work');
  }

  isCreatedUser(book: BookEntry): boolean {
    return this.storageService.isUser(book);
  }

  getBook(): void {
    console.log(
      'this.route.snapshot.paramMap.get(id)',
      this.route.snapshot.paramMap.get('id')
    );

    const paramId = this.route.snapshot.paramMap.get('id');

    if (paramId == null) return;
    const id = Number(paramId);
    console.log('id', id);
    this.bookService.getBook(id).subscribe((book) => (this.book = book));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.book) {
      this.bookService.updateBook(this.book).subscribe(() => this.goBack());
    }
  }

  clickEdit(): void {
    if (this.isLoggedIn) {
      this.showEdit = true;
    }
  }

  hideEdit(): void {
    if (this.isLoggedIn) {
      this.showEdit = false;
    }
  }
}
