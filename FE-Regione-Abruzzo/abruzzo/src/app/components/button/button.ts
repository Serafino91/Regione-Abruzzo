import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [RouterLink],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
    @Input() label = '';
    @Input() link = '';
  constructor(private router: Router) {}
  navigate() {
    this.router.navigate([this.link]);
  }
}
