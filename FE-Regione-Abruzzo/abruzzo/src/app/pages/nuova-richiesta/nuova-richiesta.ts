import { Component } from '@angular/core';
import { NavForm } from '../../components/nav-form/nav-form';
import { ScegliProgetto } from '../../sections/nuova-richiesta/scegli-progetto/scegli-progetto';
import { SelezionaServizio } from '../../sections/nuova-richiesta/seleziona-servizio/seleziona-servizio';
import { ControllaInvia } from '../../sections/nuova-richiesta/controlla-invia/controlla-invia';
import { Router } from '@angular/router';
import {SectionFooter} from '../../sections/nuova-richiesta/section-footer/section-footer';

@Component({
  selector: 'app-nuova-richiesta',
  imports: [NavForm, ScegliProgetto, SelezionaServizio, ControllaInvia, SectionFooter],
  templateUrl: './nuova-richiesta.html',
  styleUrl: './nuova-richiesta.css',
  standalone: true,
})
export class NuovaRichiesta {
  constructor(public router: Router) {}
  currentStep = 1;

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}
