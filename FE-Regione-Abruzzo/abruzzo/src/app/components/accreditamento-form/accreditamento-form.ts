import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface AccreditamentoRequest {
  nome: string;
  cognome: string;
  codiceFiscale: string;
  partitaIVA: string;
  ruolo: string;
  email: string;
  pec: string;
}

@Component({
  selector: 'app-accreditamento-form',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './accreditamento-form.html',
  styleUrl: './accreditamento-form.css',
})
export class AccreditamentoForm {
  @Output() nuovaRichiesta = new EventEmitter<AccreditamentoRequest>();
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
  onSubmit() {
    if (this.accreditamentoForm.valid) {
      this.nuovaRichiesta.emit(this.accreditamentoForm.value as AccreditamentoRequest);
    }
  }
}
