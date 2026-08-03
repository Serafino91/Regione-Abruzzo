import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
})
export class Login implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      fiscalCode: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  login(): void {
  if (this.loginForm.invalid) return;

  const credentials = {
    fiscalCode: this.loginForm.value.fiscalCode.toUpperCase(),
    email: this.loginForm.value.email,
    password: ''
  };

  // 1. Chiami l'authenticate (che internamente salva già token e ruoli in sessionStorage)
  this.authService.authenticate(credentials).subscribe({
    next: (response) => {
      console.log('Login effettuato con successo:', response);
      
      // 2. Navighi direttamente a /home senza chiamare saveToken
      this.router.navigate(['/home']);
    },
    error: (err) => {
      console.error('Errore durante il login:', err);
    }
  });
}
}