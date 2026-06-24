import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { NavForm } from '../../components/nav-form/nav-form';
import { ScegliProgetto } from '../../sections/nuova-richiesta/scegli-progetto/scegli-progetto';
import { SelezionaServizio } from '../../sections/nuova-richiesta/seleziona-servizio/seleziona-servizio';
import { ControllaInvia } from '../../sections/nuova-richiesta/controlla-invia/controlla-invia';
import {SectionFooter} from '../../sections/nuova-richiesta/section-footer/section-footer';

@Component({
  selector: 'app-nuova-richiesta',
  imports: [
    NavForm,
    ScegliProgetto,
    SelezionaServizio,
    ControllaInvia,
    SectionFooter,
    ReactiveFormsModule,
  ],
  templateUrl: './nuova-richiesta.html',
  styleUrl: './nuova-richiesta.css',
  standalone: true,
})
export class NuovaRichiesta {
  currentStep = 1;

  richiestaForm = new FormGroup({
    progetto: new FormGroup({}),
    servizio: new FormGroup({}),
    conferma: new FormGroup({}),
  });

  nextStep() {
    const gruppoCorrente = this.getCurrentGroup();

    if (gruppoCorrente.invalid) {
      gruppoCorrente.markAllAsTouched();
      return;
    }

    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }

  private getCurrentGroup(): FormGroup {
    switch (this.currentStep) {
      case 1:
        return this.richiestaForm.get('progetto') as FormGroup;
      case 2:
        return this.richiestaForm.get('servizio') as FormGroup;
      case 3:
        return this.richiestaForm.get('conferma') as FormGroup;
      default:
        throw new Error('Step non valido');
    }
  }

  debugForm() {
    console.log(this.richiestaForm.value);
  }
}
