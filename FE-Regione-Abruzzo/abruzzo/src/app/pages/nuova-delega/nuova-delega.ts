import { Component, inject } from '@angular/core';
import { WizardLabelItem } from '../../constants/WizardLabelItem';
import { WizardBar } from '../../components/wizard-bar/wizard-bar';
import { SectionFooter } from '../../sections/nuova-richiesta/section-footer/section-footer';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ScegliUtenza } from '../../sections/nuova-delega/scegli-utenza/scegli-utenza';
import { SelezionaProgetti } from '../../sections/nuova-delega/seleziona-progetti/seleziona-progetti';
import { ControllaDati } from '../../sections/nuova-delega/controlla-dati/controlla-dati';
import {PageHeader} from '../../components/page-header/page-header';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuova-delega',
  imports: [
    WizardBar,
    SectionFooter,
    ScegliUtenza,
    SelezionaProgetti,
    ControllaDati,
    ReactiveFormsModule,
    PageHeader,
  ],
  standalone: true,
  templateUrl: './nuova-delega.html',
  styleUrl: './nuova-delega.css',
})

export class NuovaDelega {
  currentStep = 1;
  wizardItems: WizardLabelItem[] = [
    { id: 1, label: '01.Scegli utenza', icon: 'it-user' },
    { id: 2, label: '02.Selezione i progetti', icon: 'it-list' },
    { id: 3, label: '03.Controlla i dati ed invia', icon: 'it-check-circle' },
  ];

  delegaForm = new FormGroup({
    utenzaForm: new FormGroup({}),
    progettiForm: new FormGroup({}),
  });

  noteForm = new FormGroup({
    note: new FormControl('', [Validators.maxLength(500)]),
  });

  private router = inject(Router);

  nextStep() {
    this.currentStep++;
  }
  previousStep() {
    this.currentStep--;
  }
  canGoNext(): boolean {
    return true;
  }
  goBack(): void {
    this.router.navigateByUrl("home/deleghe");
  }

  debugForm() {
    console.log(this.delegaForm.value);
  }
}
