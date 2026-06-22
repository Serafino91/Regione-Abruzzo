import {
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject,
  ChangeDetectorRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { ServizioCard } from './components/servizio-card/servizio-card';
import { ServiziService } from '../../../services/servizi.service';
import { ServizioModel } from '../../../model/servizioModel';
import { SectionHeader} from '../../../components/section-header/section-header';

@Component({
  selector: 'app-catalogo',
  imports: [ServizioCard, SectionHeader],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  @ViewChild('splideRef') splideRef!: ElementRef;

  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef); // Inject ChangeDetector

  public servizi: ServizioModel[] = [];

  constructor(private servizioService: ServiziService) {}

  ngOnInit(): void {
    this.getServizi();
  }

  private getServizi(): void {
    this.servizioService
      .getServizi()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => {
          this.servizi = resp;
          
          // Force Angular to see the array data and draw the HTML slots
          this.cdr.detectChanges(); 
          
          // Now that HTML elements exist, initialize Splide safely
          this.initSplide();
        },
        error: (err) => {
          console.error('Errore nel recupero dei servizi:', err);
        },
      });
  }

  private async initSplide(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Wait exactly one event loop tick for elements to settle safely in the DOM
    setTimeout(async () => {
      if (!this.splideRef?.nativeElement) return;

      const { default: Splide } = await import('@splidejs/splide');

      new Splide(this.splideRef.nativeElement, {
        perPage: 3,
        gap: '1rem',
        pagination: true,
        arrows: true,
        breakpoints: {
          992: { perPage: 2 },
          768: { perPage: 1 },
        },
      }).mount();
    }, 0);
  }
}