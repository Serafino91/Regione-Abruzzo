import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-header',
  imports: [RouterLink],
  templateUrl: './section-header.html',
  styleUrl: './section-header.css',
})
export class SectionHeader {
  @Input() titolo = '';
  @Input() link = '';
  @Input() testoLink = '';

  constructor(private router: Router) {}
  navigate() {
    this.router.navigate([this.link]);
  }
}
