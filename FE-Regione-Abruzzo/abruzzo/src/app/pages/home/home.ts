import { Component } from '@angular/core';
import { RichiesteInCorso } from '../../sections/home/richieste-in-corso/richieste-in-corso';
import { IncidentInCorso } from '../../sections/home/incident-in-corso/incident-in-corso';
import { ProgettiInCorso } from '../../sections/home/progetti-in-corso/progetti-in-corso';
import { Catalogo } from '../../sections/home/catalogo/catalogo';
import { AppModal } from '../../components/app-modal/app-modal';


@Component({
  selector: 'app-home',
  imports: [RichiesteInCorso, IncidentInCorso, ProgettiInCorso, Catalogo],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true,
})
export class Home {


}
