import { Component } from '@angular/core';
import { MessageService } from './Services/message.service';
import { StorageService } from './Services/storage.service';
import { UserService } from './Services/user.service';
import { RoleEntry } from './types/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bookApp';
  private role = '';
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.role = user.role;

      this.showAdminBoard = this.role === RoleEntry.Administrator.toString();

      this.username = user.username;
    }
  }

  logout(): void {
    this.userService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.storageService.clean();

        //  window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
