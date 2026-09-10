import { ChangeDetectorRef, Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProgettoModel } from '../../../model/progetto.model';
import { ProgettiService } from '../../../services/progetti.service';
import { TableColumn, TableComponent } from '../../../components/table/table';

@Component({
  selector: 'app-scegli-progetto',
  imports: [FormsModule, ReactiveFormsModule, TableComponent],
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

  constructor(private progettiService: ProgettiService) {}
  readonly maxNoteLength = 500;

  colonneProgetti: TableColumn[] = [
    { key: 'select', label: '', sortable: false, class: 'col-checkbox' },
    { key: 'idProgetto', label: 'ID progetto', sortable: true, class: 'col-id' },
    { key: 'nome', label: 'Nome progetto', sortable: true, class: 'col-nome' },
    { key: 'description', label: 'Descrizione progetto', sortable: true, class: 'col-desc' },
    { key: 'dataCreazione', label: 'Data creazione', sortable: true, class: 'col-data' },
    { key: 'servizi', label: 'Totale servizi', sortable: true, class: 'text-end col-small' },
  ];

  ngOnInit() {
    if (!this.formGroup.contains('ricercaNome')) {
      this.formGroup.addControl('ricercaNome', new FormControl(''));
    }
    if (!this.formGroup.contains('selezione')) {
      this.formGroup.addControl(
        'selezione',
        new FormControl<ProgettoModel | null>(null, Validators.required),
      );
    }
    if (!this.formGroup.contains('dataDa')) {
      this.formGroup.addControl('dataDa', new FormControl(''));
    }
    if (!this.formGroup.contains('dataA')) {
      this.formGroup.addControl('dataA', new FormControl(''));
    }

    // ripristina lo stato locale dal form (che invece sopravvive tra i cambi di step)
    this.progettoSelezionato = this.formGroup.get('selezione')?.value ?? null;
    const testoRicerca = this.formGroup.get('ricercaNome')?.value;
    if (testoRicerca) {
      this.filtra(testoRicerca);
    }

    this.loadProgetti();

    this.formGroup
      .get('ricercaNome')!
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.filtra(value ?? ''));
  }

  private loadProgetti(): void {
    this.progettiService
      .getProgetti()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp: any[]) => {
          console.log(resp);
          this.allProgetti = resp.map((p: any) => ({
            idProgetto: p.id,
            nome: p.name,
            destinationLink: p.destinationLink,
            description: p.description,
            dataCreazione: p.createAt,
            dataUltimaModifica: p.updateAt,
            servizi: p.services,
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
    this.progetti = this.allProgetti.filter(
      (p) => p.nome?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q),
    );
  }

  selezionaProgetto(progetto: ProgettoModel): void {
    const progettoSelezionato = this.formGroup.get('selezione')?.value;

    if (progettoSelezionato?.idProgetto === progetto.idProgetto) {
      this.progettoSelezionato = null;
      this.formGroup.get('selezione')?.setValue(null);
    } else {
      this.progettoSelezionato = progetto;
      this.formGroup.get('selezione')?.setValue(progetto);
    }
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
      this.formGroup.addControl(
        'selezione',
        new FormControl<ProgettoModel | null>(null, Validators.required),
      );
      this.formGroup.addControl('dataDa', new FormControl(''));
      this.formGroup.addControl('dataA', new FormControl(''));
    }
    this.nuovaRichiesta.emit(this.newProgetto);
  }
}
