import { Component, Input } from '@angular/core';
import { Url } from '../url/url';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-header',
  imports: [Url, RouterLink],
  standalone: true,
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
})
export class PageHeader {
  @Input() titolo!: string;
  @Input() sottotitolo?: string;
  @Input() button?: string;
  @Input() backspace?: string;
  @Input() link?: string;
  @Input() linkBackspace?: string;
}
