import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  PLATFORM_ID,
  inject,
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { ServizioCard } from './components/servizio-card/servizio-card';
import { SectionHeader} from '../../../components/section-header/section-header';

@Component({
  selector: 'app-catalogo',
  imports: [ServizioCard, SectionHeader],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements AfterViewInit {
  @ViewChild('splideRef')
  splideRef!: ElementRef;

  private platformId = inject(PLATFORM_ID);

  servizi = [
    {
      id: 1,
      titolo: 'Servizio 1',
      descrizione: 'Descrizione servizio 1',
    },
    {
      id: 2,
      titolo: 'Servizio 2',
      descrizione: 'Descrizione servizio 2',
    },
    {
      id: 3,
      titolo: 'Servizio 3',
      descrizione: 'Descrizione servizio 3',
    },
    {
      id: 4,
      titolo: 'Servizio 4',
      descrizione: 'Descrizione servizio 4',
    },
    {
      id: 5,
      titolo: 'Servizio 5',
      descrizione: 'Descrizione servizio 5',
    },
  ];

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const { default: Splide } = await import('@splidejs/splide');

    new Splide(this.splideRef.nativeElement, {
      perPage: 3,
      gap: '1rem',
      pagination: true,
      arrows: true,

      breakpoints: {
        992: {
          perPage: 2,
        },
        768: {
          perPage: 1,
        },
      },
    }).mount();
  }
}
