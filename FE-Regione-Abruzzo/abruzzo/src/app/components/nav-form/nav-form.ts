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
    { id: 1, label: 'Scegli il progetto' },
    { id: 2, label: 'Seleziona il servizio e compila il form' },
    { id: 3, label: 'Controlla ed invia' },
  ];
}
