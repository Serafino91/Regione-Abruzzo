import { Component, Input } from '@angular/core';
import { InfoBarItem } from '../../constants/InfoBarItem';

@Component({
  selector: 'app-info-bar',
  imports: [],
  standalone: true,
  templateUrl: './info-bar.html',
  styleUrl: './info-bar.css',
})
export class InfoBar {
  @Input() items: InfoBarItem[] = [];
}
