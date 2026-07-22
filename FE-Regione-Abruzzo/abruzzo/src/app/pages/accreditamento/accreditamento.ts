import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import {AppModal} from '../../components/app-modal/app-modal';
import { PageHeader } from '../../components/page-header/page-header';

@Component({
  selector: 'app-accreditamento',
  standalone: true,
  imports: [ReactiveFormsModule, AppModal, PageHeader],
  templateUrl: './accreditamento.html',
  styleUrl: './accreditamento.css',
})
export class Accreditamento implements OnInit {
  constructor(protected router: Router) {}

  showModal = false;
  showModalRichiesta = false;

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

  inviaRichiesta() {
    this.showModalRichiesta = true;
  }

  goToHome(): void {
    this.router.navigate(['home']);
  }

}
