import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-accreditamento',
  imports: [],
  standalone: true,
  templateUrl: './pre-accreditamento.html',
  styleUrl: './pre-accreditamento.css',
})
export class PreAccreditamento {

  constructor(private router: Router) {}

  richiediAccreditamento() {
    this.router.navigate(['home/accreditamento'])
  };
}
