import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {Url} from '../../components/url/url';

@Component({
  selector: 'app-accreditamento',
  standalone: true,
  imports: [ReactiveFormsModule, Url],
  templateUrl: './accreditamento.html',
  styleUrl: './accreditamento.css',
})
export class Accreditamento implements OnInit {
  constructor(
    private userService: UserService,
    protected router: Router,
    private fb: FormBuilder,
  ) {}
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
