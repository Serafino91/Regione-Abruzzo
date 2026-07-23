import { Component, Input } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccreditamentoForm } from '../../../components/accreditamento-form/accreditamento-form';

@Component({
  selector: 'app-scegli-utenza',
  imports: [ReactiveFormsModule, AccreditamentoForm],
  standalone: true,
  templateUrl: './scegli-utenza.html',
  styleUrl: './scegli-utenza.css',
})
export class ScegliUtenza {
  @Input({ required: true })
  formGroup!: FormGroup;
  showDelegatoForm = false;

  utenteForm = new FormGroup({
    utente: new FormControl(''),
  });

  cercaUtente() {}
}
