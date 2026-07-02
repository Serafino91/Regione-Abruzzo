import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrazione',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registrazione.html',
  styleUrl: './registrazione.css',
})


export class Registrazione implements OnInit {

  constructor(private fb: FormBuilder) {}
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
}
