import { ChangeDetectorRef, Component, DestroyRef, inject, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TableColumn, TableComponent} from '../../../components/table/table';
import {ProgettoModel} from "../../../model/progetto.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ProgettiService} from "../../../services/progetti.service";

@Component({
  selector: 'app-seleziona-progetti',
  imports: [ReactiveFormsModule, TableComponent],
  standalone: true,
  templateUrl: './seleziona-progetti.html',
  styleUrl: './seleziona-progetti.css',
})
export class SelezionaProgetti {
  @Input({ required: true })
  formGroup!: FormGroup;
  @Input() progetti: ProgettoModel[] = [];
  listaProgetti: any[] = [];

  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  constructor(private progettiService: ProgettiService) {}

  progettiForm = new FormGroup({
    progetto: new FormControl(''),
  });

  ngOnInit() {
    if (!this.formGroup.contains('progetti')) {
      this.formGroup.addControl(
          'progetti',
          new FormArray([])
      );
    }

    this.loadProgetti();
  }

  colonneProgetti: TableColumn[] = [
    { key: 'idProgetto', label: 'ID progetto', sortable: true, class: 'col-id' },
    { key: 'nome', label: 'Nome progetto', sortable: true, class: 'col-nome' },
    { key: 'description', label: 'Descrizione progetto', sortable: true, class: 'col-desc' },
    { key: 'servizi', label: 'Totale servizi', sortable: true, class: 'col-small' },
  ];

  private loadProgetti(): void {
    this.progettiService
      .getProgetti()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp: any[]) => {
          console.log(resp);
          this.listaProgetti = resp.map((p: any) => ({
            idProgetto: p.id,
            nome: p.name,
            description: p.description,
            servizi: p.services.length,
          }));
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Errore nel recupero dei progetti:', err),
      });
  }

  getValue(row: any, key: string): string {
    if (!key) return '';
    return key.split('.').reduce((acc, part) => acc && acc[part], row) ?? '';
  }

  onRowSelectionChange(event: { row: ProgettoModel; selected: boolean }): void {
    const progettiFormArray = this.formGroup.get('progetti') as FormArray;

    const index = progettiFormArray.controls.findIndex(
      (control) => control.value.idProgetto === event.row.idProgetto,
    );

    if (event.selected) {
      // Evita duplicati
      if (index === -1) {
        progettiFormArray.push(new FormControl(event.row));
      }
    } else {
      // Rimuove il progetto deselezionato
      if (index !== -1) {
        progettiFormArray.removeAt(index);
      }
    }
    console.log(progettiFormArray.value);
  }

  cercaProgetto() {}
}
