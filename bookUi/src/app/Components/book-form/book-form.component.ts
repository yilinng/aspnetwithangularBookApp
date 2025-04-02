import { Component, OnInit } from '@angular/core';

import { Book } from 'src/app/Entities/book';
import { Location } from '@angular/common';
import { BookService } from 'src/app/Services/book.service';
import { StorageService } from 'src/app/Services/storage.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})

//https://v14.angular.io/guide/forms
export class BookFormComponent implements OnInit {
  user_Id = 1;
  isAddFailed = false;

  model = new Book('', '', 0, this.user_Id);
  errorMessage = '';

  submitted = false;
  isLoggedIn = false;
  constructor(
    private storageService: StorageService,
    private bookService: BookService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.user_Id = user.user_Id;
      console.log('user', user);
    }
  }

  onSubmit() {
    this.submitted = true;
    console.log('this model', this.model);
    this.bookService.addBook(this.model).subscribe({
      next: (data) => {
        console.log(data);
        this.isAddFailed = true;
        this.goBack();
        // this.reloadPage();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isAddFailed = true;
      },
    });
  }

  newBook() {
    this.model = new Book('', '', 0, this.user_Id);
  }

  goBack(): void {
    this.location.back();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
