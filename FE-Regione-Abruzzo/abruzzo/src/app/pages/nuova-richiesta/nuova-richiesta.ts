import { Component } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import {Router} from "@angular/router";
import { NavForm } from '../../components/nav-form/nav-form';
import { ScegliProgetto } from '../../sections/nuova-richiesta/scegli-progetto/scegli-progetto';
import { SelezionaServizio } from '../../sections/nuova-richiesta/seleziona-servizio/seleziona-servizio';
import { ControllaInvia } from '../../sections/nuova-richiesta/controlla-invia/controlla-invia';
import {SectionFooter} from '../../sections/nuova-richiesta/section-footer/section-footer';
import {Url} from '../../components/url/url';
import {RichiesteService} from "../../services/richieste.service";

@Component({
  selector: 'app-nuova-richiesta',
  imports: [
    NavForm,
    ScegliProgetto,
    SelezionaServizio,
    ControllaInvia,
    SectionFooter,
    ReactiveFormsModule,
    Url,
  ],
  templateUrl: './nuova-richiesta.html',
  styleUrl: './nuova-richiesta.css',
  standalone: true,
})
export class NuovaRichiesta {
  currentStep = 1;
  url = '';

  richiestaForm = new FormGroup({
    progettoForm: new FormGroup({}),
    servizioForm: new FormGroup({
      servizi: new FormArray([]),
    }),
  });

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }

  private getCurrentGroup(): FormGroup {
    switch (this.currentStep) {
      case 1:
        return this.richiestaForm.get('progettoForm') as FormGroup;
      case 2:
        return this.richiestaForm.get('servizioForm') as FormGroup;
      default:
        throw new Error('Step non valido');
    }
  }

  canGoNext(): boolean {
    const servizi = this.richiestaForm.get('servizioForm.servizi') as FormArray;

    switch (this.currentStep) {
      case 1:
        const gruppoCorrente = this.getCurrentGroup();
        if (gruppoCorrente.invalid) {
          return false;
        } else return true;
      case 2:
        return servizi.length > 0;
      default:
        return true;
    }
  }

  nuovaRichiesta = false;

  onNuovaRichiesta(flag: boolean) {
    this.nuovaRichiesta = flag;
  }

  debugForm() {
    console.log(this.richiestaForm.value);
  }
}
