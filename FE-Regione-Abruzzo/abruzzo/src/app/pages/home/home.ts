import { Component } from '@angular/core';
import { TicketDaGestire } from '../../sections/home/ticket-da-gestire/ticket-da-gestire';
import { RichiesteInCorso } from '../../sections/home/richieste-in-corso/richieste-in-corso';
import { IncidentInCorso } from '../../sections/home/incident-in-corso/incident-in-corso';
import { ProgettiInCorso } from '../../sections/home/progetti-in-corso/progetti-in-corso';
import { Catalogo } from '../../sections/home/catalogo/catalogo';
import { AppModal } from '../../components/app-modal/app-modal';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    TicketDaGestire,
    RichiesteInCorso,
    IncidentInCorso,
    ProgettiInCorso,
    Catalogo,
    AppModal,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true,
})
export class Home {
  isAdmin = true;
  showSelezionaProfiliModal = false;

  profiloForm: FormGroup = new FormGroup({
    profilo: new FormControl('', Validators.required),
  });
}
