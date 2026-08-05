import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-accesso',
  imports: [],
  standalone: true,
  templateUrl: './pre-accesso.html',
  styleUrl: './pre-accesso.css',
})
export class PreAccesso {

  constructor(private router: Router) {}

  accedi() {
    this.router.navigate(['home']);
  }
}
