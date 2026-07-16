import { Component } from '@angular/core';
import { Input } from '@angular/core'
import { ProgettoModel } from '../../../../../model/progetto.model';
import { ActivatedRoute, Router } from '@angular/router';
import {ProgettiService} from "../../../../../services/progetti.service";
@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
  standalone: true,
})
export class ProjectCard {
  @Input() progetto!: ProgettoModel;

  constructor(

    private router: Router,
  ) {}

  apriDettaglio() {
    this.router.navigate(['/home/progetti/dettaglio-progetto', this.progetto.idProgetto]);
  }
}
