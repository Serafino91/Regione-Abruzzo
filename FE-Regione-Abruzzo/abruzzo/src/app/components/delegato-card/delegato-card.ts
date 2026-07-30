import { Component, Input } from '@angular/core';
import { UserModel } from '../../model/user.model';

@Component({
  selector: 'app-delegato-card',
  imports: [],
  standalone: true,
  templateUrl: './delegato-card.html',
  styleUrl: './delegato-card.css',
})
export class DelegatoCard {
  @Input() user?: UserModel;

}
