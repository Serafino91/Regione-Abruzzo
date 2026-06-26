import { Component } from '@angular/core';
import { Input } from '@angular/core'
import { ProgettoModel } from '../../../../../model/progetto.model';
@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
  standalone: true,
})
export class ProjectCard {
  @Input() progetto!: ProgettoModel;
}
