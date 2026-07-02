import { Component } from '@angular/core';
import { Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './user.html',
  styleUrl: './user.css',
})

export class User {
  constructor(private router: Router) {}
  user = { id: 0, name: 'Sarah Accenture', role: 'Administrator', isLoggedIn: false };
}
