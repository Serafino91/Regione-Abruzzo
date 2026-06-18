import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [],
  standalone: true,
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  user = {id: 0, name: 'Sarah', isLoggedIn: true};

}
