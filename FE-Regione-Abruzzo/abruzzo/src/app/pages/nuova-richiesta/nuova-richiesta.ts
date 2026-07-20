import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ScegliProgetto } from '../../sections/nuova-richiesta/scegli-progetto/scegli-progetto';
import { SelezionaServizio } from '../../sections/nuova-richiesta/seleziona-servizio/seleziona-servizio';
import { ControllaInvia } from '../../sections/nuova-richiesta/controlla-invia/controlla-invia';
import { SectionFooter } from '../../sections/nuova-richiesta/section-footer/section-footer';
import { Url } from '../../components/url/url';
import { WizardBar } from '../../components/wizard-bar/wizard-bar';
import { WizardLabelItem } from '../../constants/WizardLabelItem';

@Component({
  selector: 'app-nuova-richiesta',
  imports: [
    ScegliProgetto,
    SelezionaServizio,
    ControllaInvia,
    SectionFooter,
    ReactiveFormsModule,
    Url,
    WizardBar,
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

  wizardItems: WizardLabelItem[] = [
    { id: 1, label: '01.Scegli il progetto', icon: 'it-list' },
    { id: 2, label: '02.Scegli servizio e compila il form', icon: 'it-software' },
    { id: 3, label: '03.Controlla ed invia', icon: 'it-check-circle' },
  ];

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
