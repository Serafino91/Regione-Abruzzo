import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accreditamento',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './accreditamento.html',
  styleUrl: './accreditamento.css',
})


export class Accreditamento implements OnInit {


  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  spidForm!: FormGroup;
  ngOnInit() {
    this.spidForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      codiceFiscale: ['', Validators.required],
      dataNascita: ['', Validators.required],
      comuneNascita: ['', Validators.required],
      provinciaNascita: ['', Validators.required],
      nazioneNascita: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }


  register() {
    this.userService.setUser({
      name: this.spidForm.get('nome')?.value,
      role: 'Utente',
      isLoggedIn: true,
    });
    this.router.navigate(['/home']);
  }
}
