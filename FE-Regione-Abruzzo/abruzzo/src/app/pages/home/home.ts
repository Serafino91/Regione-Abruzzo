import { Component } from '@angular/core';
import { RichiesteInCorso } from '../../sections/home/richieste-in-corso/richieste-in-corso';
import { IncidentInCorso } from '../../sections/home/incident-in-corso/incident-in-corso';
import { ProgettiFlexbox } from '../../sections/home/progetti-in-corso/progetti-flexbox';
import { Catalogo } from '../../sections/home/catalogo/catalogo';


@Component({
  selector: 'app-home',
  imports: [RichiesteInCorso, IncidentInCorso, ProgettiFlexbox, Catalogo],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
}
