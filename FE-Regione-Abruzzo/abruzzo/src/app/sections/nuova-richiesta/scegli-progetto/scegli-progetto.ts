import {ChangeDetectorRef, Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {map} from 'rxjs';
import {ProgettoModel} from '../../../model/progetto.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ProgettiService} from '../../../services/progetti.service';

@Component({
  selector: 'app-scegli-progetto',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './scegli-progetto.html',
  styleUrl: './scegli-progetto.css',
  standalone: true,
})
export class ScegliProgetto {
  @Input({ required: true }) formGroup!: FormGroup;
  @Output() nuovaRichiesta = new EventEmitter<boolean>();
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  newProgetto = false;
  public progetti: ProgettoModel[] = [];
  constructor(private progettiService: ProgettiService) {}
  readonly maxNoteLength = 500;

  ngOnInit() {
    this.formGroup.addControl('selezione', new FormControl('', Validators.required));
    this.formGroup.addControl('dataDa', new FormControl('', Validators.required));
    this.formGroup.addControl('dataA', new FormControl('', Validators.required));
    this.getProgetti();
  }

  private getProgetti(): void {
    this.progettiService
      .getProgetti()
      .pipe(
        map((resp: ProgettoModel[]) => resp.slice(0, 3)), //prende massimo 3 progetti per la sezione in home
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (resp) => {
          this.progetti = resp;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Errore nel recupero dei progetti:', err);
        },
      });
  }

  associaProgetto() {
    this.newProgetto = !this.newProgetto;

    if (this.newProgetto) {
      this.formGroup.removeControl('selezione');
      this.formGroup.removeControl('dataA');
      this.formGroup.removeControl('dataDa');

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
      this.formGroup.addControl('selezione', new FormControl('', Validators.required));
      this.formGroup.addControl('dataDa', new FormControl('', Validators.required));
      this.formGroup.addControl('dataA', new FormControl('', Validators.required));
    }
    this.nuovaRichiesta.emit(this.newProgetto);
  }
}
