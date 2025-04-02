import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './Components/books/books.component';
import { BookDetailComponent } from './Components/book-detail/book-detail.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { BookSearchComponent } from './Components/book-search/book-search.component';
import { BookFormComponent } from './Components/book-form/book-form.component';
import { SignupComponent } from './Components/signup/signup.component';
import { LoginComponent } from './Components/login/login.component';
import { httpInterceptorProviders } from './helpers/http.interceptor';
import { ProfileComponent } from './Components/profile/profile.component';
import { BoardAdminComponent } from './Components/board-admin/board-admin.component';
import { BoardUserComponent } from './Components/board-user/board-user.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookDetailComponent,
    MessagesComponent,
    DashboardComponent,
    BookSearchComponent,
    BookFormComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
