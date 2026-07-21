import { Component, Input } from '@angular/core';
import { Url } from '../url/url';

@Component({
  selector: 'app-page-header',
  imports: [Url],
  standalone: true,
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
})
export class PageHeader {
  @Input() titolo!: string;
  @Input() sottotitolo!: string;
  @Input() showButton?: boolean;
  @Input() link!: string;
}
