import { Component, Input } from '@angular/core';
import { ProgettoModel } from '../../model/progetto.model';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-progetto-accordion',
  imports: [UpperCasePipe],
  standalone: true,
  templateUrl: './progetto-accordion.html',
  styleUrl: './progetto-accordion.css',
})
export class ProgettoAccordion {
  @Input({ required: true }) progetto!: ProgettoModel;

  expanded = false;

  toggle(): void {
    this.expanded = !this.expanded;
  }
}
