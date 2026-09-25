import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  readonly maxNoteLength = 500;

  private allProgetti: ProgettoModel[] = [];
  public progetti: ProgettoModel[] = [];
  public progettoSelezionato: ProgettoModel | null = null;

  constructor(private progettiService: ProgettiService) {}

  colonneProgetti: TableColumn[] = [
    { key: 'select', label: '', sortable: false, class: 'col-checkbox' },
    { key: 'idProgetto', label: 'ID progetto', sortable: true, class: 'col-id' },
    { key: 'nome', label: 'Nome progetto', sortable: true, class: 'col-nome' },
    { key: 'description', label: 'Descrizione progetto', sortable: true, class: 'col-desc' },
    { key: 'dataCreazione', label: 'Data creazione', sortable: true, class: 'col-data' },
    { key: 'servizi', label: 'Totale servizi', sortable: true, class: 'text-end col-small' },
  ];

  ngOnInit() {
    this.inizializzaControlli();

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

  private inizializzaControlli(): void {
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
    if (!this.formGroup.contains('progetto')) {
      this.formGroup.addControl(
        'progetto',
        new FormGroup({
          nome: new FormControl('', Validators.required),
          link: new FormControl('', Validators.required),
          descrizione: new FormControl('', Validators.required),
          dataScadenzaProgetto: new FormControl('', Validators.required),
        }),
      );
    }

    this.formGroup.get('progetto')?.disable();
  }

  private loadProgetti(): void {
    this.progettiService
      .getProgetti()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp: any[]) => {
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
    this.formGroup.get('selezione')?.markAsTouched();
  }

  get selezioneInvalida(): boolean {
    const c = this.formGroup.get('selezione');
    return !!c && c.invalid && c.touched && !this.newProgetto;
  }

  formatDate(dateStr?: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('it-IT');
  }

  associaProgetto(): void {
    this.newProgetto = !this.newProgetto;

    if (this.newProgetto) {
      this.passaANuovoProgetto();
    } else {
      this.passaAProgettoEsistente();
    }

    this.nuovaRichiesta.emit(this.newProgetto);
  }

  private passaANuovoProgetto(): void {
    this.formGroup.reset();

    this.formGroup.get('ricercaNome')?.disable();
    this.formGroup.get('selezione')?.disable();
    this.formGroup.get('dataDa')?.disable();
    this.formGroup.get('dataA')?.disable();

    this.progetti = [];
    this.progettoSelezionato = null;

    const progettoGroup = this.formGroup.get('progetto') as FormGroup;
    progettoGroup.reset();
    progettoGroup.enable();
  }

  private passaAProgettoEsistente(): void {
    this.formGroup.get('progetto')?.disable();

    this.formGroup.get('ricercaNome')?.enable();
    this.formGroup.get('selezione')?.enable();
    this.formGroup.get('dataDa')?.enable();
    this.formGroup.get('dataA')?.enable();
  }
}
