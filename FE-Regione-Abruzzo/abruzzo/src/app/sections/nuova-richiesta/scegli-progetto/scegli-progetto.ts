import { ChangeDetectorRef, Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProgettoModel } from '../../../model/progetto.model';
import { ProgettiService } from '../../../services/progetti.service';

@Component({
  selector: 'app-scegli-progetto',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './scegli-progetto.html',
  styleUrl: './scegli-progetto.css',
  standalone: true,
})
export class ScegliProgetto implements OnInit {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input() progettoEsistenteError = false;
  @Output() nuovaRichiesta = new EventEmitter<boolean>();
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  newProgetto = false;

  private allProgetti: ProgettoModel[] = [];
  public progetti: ProgettoModel[] = [];
  public progettoSelezionato: ProgettoModel | null = null;
  public sortColumn = '';
  public sortDir: 'asc' | 'desc' = 'asc';

  constructor(private progettiService: ProgettiService) {}
  readonly maxNoteLength = 500;

  ngOnInit() {
    this.formGroup.addControl('ricercaNome', new FormControl(''));
    this.formGroup.addControl('selezione', new FormControl<ProgettoModel | null>(null, Validators.required));
    this.formGroup.addControl('dataDa', new FormControl('', Validators.required));
    this.formGroup.addControl('dataA', new FormControl('', Validators.required));

    this.loadProgetti();

    this.formGroup.get('ricercaNome')!.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(value => this.filtra(value ?? ''));
  }

  private loadProgetti(): void {
    this.progettiService.getProgetti().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (resp: any[]) => {
        this.allProgetti = resp.map((p: any) => ({
          idProgetto: p.id,
          nome: p.name,
          destinationLink: p.destinationLink,
          description: p.description,
          dataCreazione: p.createAt,
          dataUltimaModifica: p.updateAt,
          servizi: p.servizi,
        }));
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Errore nel recupero dei progetti:', err),
    });
  }

  private filtra(testo: string): void {
    const q = testo.toLowerCase().trim();
    if (!q) {
      this.progetti = [];
      return;
    }
    this.progetti = this.allProgetti.filter(p =>
      p.nome?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    );
  }

  selezionaProgetto(progetto: ProgettoModel): void {
    this.progettoSelezionato = progetto;
    this.formGroup.get('selezione')?.setValue(progetto);
  }

  sort(col: string): void {
    if (this.sortColumn === col) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col;
      this.sortDir = 'asc';
    }
    this.progetti = [...this.progetti].sort((a, b) => {
      const va = col === 'servizi' ? ((a as any).servizi?.length ?? 0) : ((a as any)[col] ?? '');
      const vb = col === 'servizi' ? ((b as any).servizi?.length ?? 0) : ((b as any)[col] ?? '');
      const cmp = String(va).localeCompare(String(vb), 'it', { numeric: true });
      return this.sortDir === 'asc' ? cmp : -cmp;
    });
  }

  sortIcon(col: string): string {
    if (this.sortColumn !== col) return '↕';
    return this.sortDir === 'asc' ? '▲' : '▼';
  }

  formatDate(dateStr?: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('it-IT');
  }

  associaProgetto() {
    this.newProgetto = !this.newProgetto;

    if (this.newProgetto) {
      this.formGroup.removeControl('ricercaNome');
      this.formGroup.removeControl('selezione');
      this.formGroup.removeControl('dataA');
      this.formGroup.removeControl('dataDa');
      this.progetti = [];
      this.progettoSelezionato = null;

      if (!this.formGroup.contains('progetto')) {
        this.formGroup.addControl(
          'progetto',
          new FormGroup({
            nome: new FormControl('', Validators.required),
            link: new FormControl('', Validators.required),
            descrizione: new FormControl('', Validators.required),
          }),
        );
      }
    } else {
      this.formGroup.removeControl('progetto');
      this.formGroup.addControl('ricercaNome', new FormControl(''));
      this.formGroup.addControl('selezione', new FormControl<ProgettoModel | null>(null, Validators.required));
      this.formGroup.addControl('dataDa', new FormControl('', Validators.required));
      this.formGroup.addControl('dataA', new FormControl('', Validators.required));
    }
    this.nuovaRichiesta.emit(this.newProgetto);
  }
}
