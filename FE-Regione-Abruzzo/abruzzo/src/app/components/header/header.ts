import { Component } from '@angular/core';
import { User } from '../user/user';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [User, RouterLink, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true,
})
export class Header {
  isAdmin = true;
}
