import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
})
export class Login implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  loginForm!: FormGroup;
  ngOnInit() {
    this.loginForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  login() {
    this.userService.setUser({
      name: this.loginForm.get('nome')?.value,
      role: 'Utente',
      isLoggedIn: true,
    });
    this.router.navigate(['/home']);
  }
}
