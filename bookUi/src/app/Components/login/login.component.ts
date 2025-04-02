import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/Entities/loginModel';
import { StorageService } from 'src/app/Services/storage.service';
import { Location } from '@angular/common';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  model = new LoginModel('', '', 1);

  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role = '';

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.role = this.storageService.getUser().role;
    }
  }

  onSubmit(): void {
    console.log('this model', this.model);
    this.userService.login(this.model).subscribe({
      next: (data) => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.storageService.getUser().role;
        this.goBack();
        this.reloadPage();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }

  goBack(): void {
    this.location.go('/');
  }

  reloadPage(): void {
    window.location.reload();
  }
}
