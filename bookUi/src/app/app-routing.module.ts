import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './Components/books/books.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { BookDetailComponent } from './Components/book-detail/book-detail.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { BoardUserComponent } from './Components/board-user/board-user.component';
import { BoardAdminComponent } from './Components/board-admin/board-admin.component';
import { BookFormComponent } from './Components/book-form/book-form.component';

const routes: Routes = [
  { path: 'books', component: BooksComponent },
  { path: 'books/create', component: BookFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: BookDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
