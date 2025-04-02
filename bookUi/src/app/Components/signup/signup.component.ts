import { Component, OnInit } from '@angular/core';

import { SignupModel } from 'src/app/Entities/signupModel';
import { Location } from '@angular/common';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  model = new SignupModel('', '', '', 1);

  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private userService: UserService, private location: Location) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    console.log('this model', this.model);
    this.userService.register(this.model).subscribe({
      next: (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;

        this.navigationToLogin();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      },
    });
  }

  newBook() {
    this.model = new SignupModel('', '', '', 1);
  }

  navigationToLogin(): void {
    this.location.go('/login');
  }
}
