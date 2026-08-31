import { Component } from '@angular/core';
import { Input } from '@angular/core'
import { ProgettoModel } from '../../../../../model/progetto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
  standalone: true,
})

export class ProjectCard {
  @Input() progetto!: ProgettoModel;
  @Input() servizi!: number;
  @Input() richieste!: number;

  constructor(private router: Router) {}

  apriDettaglio() {
    this.router.navigate(['/home/progetti/dettaglio-progetto', this.progetto.idProgetto]);
  }
}
