import { Component, DestroyRef, inject } from '@angular/core';
import { Input } from '@angular/core';
import { ProjectCard } from './components/project-card/project-card';
import { ProgettoModel } from '../../../model/progetto.model';
import { ServiziService } from '../../../services/servizi.service';
import { ProgettiService } from '../../../services/progetti.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-progetti-flexbox',
  imports: [ProjectCard],
  templateUrl: './progetti-flexbox.html',
  styleUrl: './progetti-flexbox.css',
})
export class ProgettiFlexbox {
  public project: ProgettoModel[] = [];

  private destroyRef = inject(DestroyRef);
  constructor(private progettiService: ProgettiService) {}

  ngOnInit(): void {
    this.getProgetti();
  }

  private getProgetti(): void {
    this.progettiService
      .getProgetti()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => {
          this.project = resp;
        },
        error: (err) => {
          console.error('Errore nel recupero dei progetti:', err);
        },
      });
  }
}
