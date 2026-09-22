import { Component } from '@angular/core';
import { User } from '../user/user';
import { RouterLink, RouterModule } from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-header',
  imports: [User, RouterLink, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true,
})
export class Header {
  isAdmin = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.isAdmin = user.isAdmin;
    });
  }
}
