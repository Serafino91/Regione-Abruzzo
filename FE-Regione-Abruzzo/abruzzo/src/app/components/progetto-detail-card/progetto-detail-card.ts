import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-progetto-detail-card',
  imports: [],
  standalone: true,
  templateUrl: './progetto-detail-card.html',
  styleUrl: './progetto-detail-card.css',
})
export class ProgettoDetailCard {

  @Input() nome: String = '';
  @Input() link: String = '';
  @Input() descrizione: String = '';
}
