import {
    Component,
    OnInit,
    OnDestroy,
    DestroyRef,
    ElementRef,
    PLATFORM_ID,
    ViewChild,
    ChangeDetectorRef,
    inject,
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { ServizioCard } from '../../../components/servizio-card/servizio-card';
import { ServiziService } from '../../../services/servizi.service';
import { ServizioModel } from '../../../model/servizioModel';
import { SectionHeader } from '../../../components/section-header/section-header';
import { finalize, Subscription } from 'rxjs';
import { SpinnerCard } from '../../../components/spinner-card/spinner-card';

@Component({
    selector: 'app-catalogo',
    imports: [ServizioCard, SectionHeader, SpinnerCard],
    standalone: true,
    templateUrl: './catalogo.html',
    styleUrl: './catalogo.css',
})

export class Catalogo implements OnInit, OnDestroy {

    public servizi: ServizioModel[] = [];
    isLoading = signal(false);

    @ViewChild('splideRef') splideRef!: ElementRef;

    private platformId = inject(PLATFORM_ID);
    private destroyRef = inject(DestroyRef);
    private cdr = inject(ChangeDetectorRef); // Inject ChangeDetector
    private subscriptions: Subscription[] = [];

    constructor(private servizioService: ServiziService) { }

    ngOnInit(): void {
        this.getServizi();
    }

    private getServizi(): void {
        this.isLoading.set(true);

        this.subscriptions.push(
            this.servizioService.getServizi().pipe(

                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.isLoading.set(false))

            ).subscribe({
                next: (resp) => {
                    this.servizi = resp;

                    // Force Angular to see the array data and draw the HTML slots
                    this.cdr.detectChanges();

                    // Now that HTML elements exist, initialize Splide safely
                    this.initSplide();
                }
            })
        )
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

    ngOnDestroy(): void {
        this.subscriptions.map((s: Subscription) => s.unsubscribe());
    }

}