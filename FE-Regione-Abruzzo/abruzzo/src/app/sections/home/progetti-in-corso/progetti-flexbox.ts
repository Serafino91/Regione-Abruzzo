import { ChangeDetectorRef, Component, DestroyRef, PLATFORM_ID, inject } from '@angular/core';
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

 private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef); 
  
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
             this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore nel recupero dei progetti:', err);
        },
      });
  }
}
