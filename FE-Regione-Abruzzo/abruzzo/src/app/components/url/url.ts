import { Component, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-url',
  imports: [],
  standalone: true,
  templateUrl: './url.html',
  styleUrl: './url.css',
})
export class Url {

  constructor(private router: Router) {}

  get urlToUse(): string {
    return this.router.url;
  }

  get breadcrumbs(): string[] {
    return this.urlToUse
      .split('?')[0]
      .split('/')
      .filter(Boolean)
      .map((segment) => this.formatSegment(segment));
  }
  breadcrumbColor = '#003366';

  private formatSegment(segment: string): string {
    return segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }
}
