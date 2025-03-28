import { Component, OnInit } from '@angular/core';

import { Book } from 'src/app/Entities/book';

import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})

//https://v14.angular.io/guide/forms
export class BookFormComponent implements OnInit {
  constructor(private bookService: BookService) {}

  ngOnInit(): void {}

  model = new Book('', '', 0);

  submitted = false;

  onSubmit() {
    this.submitted = true;
    console.log('this model', this.model);
  }

  newBook() {
    this.model = new Book('', '', 0);
  }
}
