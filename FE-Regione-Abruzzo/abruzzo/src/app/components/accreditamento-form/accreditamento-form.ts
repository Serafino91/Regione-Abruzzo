import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-accreditamento-form',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './accreditamento-form.html',
  styleUrl: './accreditamento-form.css',
})
export class AccreditamentoForm {
  accreditamentoForm!: FormGroup;
  ngOnInit() {
    this.accreditamentoForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      cognome: new FormControl('', Validators.required),
      codiceFiscale: new FormControl('', Validators.required),
      partitaIVA: new FormControl('', Validators.required),
      ruolo: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required]),
      pec: new FormControl('', [Validators.required]),
    });
  }
}
