import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-form',
  imports: [],
  templateUrl: './nav-form.html',
  styleUrl: './nav-form.css',
  standalone: true,
})
export class NavForm {
  @Input() currentStep = 1;

  steps = [
    { id: 1, label: '01.Scegli il progetto', icon: 'it-list' },
    { id: 2, label: '02.Scegli servizio e compila il form', icon: 'it-software' },
    { id: 3, label: '03.Controlla ed invia', icon: 'it-check-circle' },
  ];
}
