import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {ProgettoAccordion} from "../../../components/progetto-accordion/progetto-accordion";
import {PermessiCard} from "../../../components/permessi-card/permessi-card";
import { TableColumn, TableComponent } from '../../../components/table/table';
import { ServizioModel } from '../../../model/servizioModel';
import {TabellaServiziProgetto} from "../../../components/tabella-servizi-progetto/tabella-servizi-progetto";




@Pipe({ name: 'mapServizi', standalone: true, pure: true })
export class MapServiziPipe implements PipeTransform {
  transform(servizi: any[] | null | undefined) {
    return (servizi ?? []).map((s) => ({
      idServizio: s.id,
      servizio: s.name,
      categoria: s.type?.name ?? '',
    }));
  }
}

@Component({
  selector: 'app-controlla-dati',
  imports: [ReactiveFormsModule, ProgettoAccordion, PermessiCard, MapServiziPipe, TabellaServiziProgetto],
  standalone: true,
  templateUrl: './controlla-dati.html',
  styleUrl: './controlla-dati.css',
})
export class ControllaDati {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) noteForm!: FormGroup;

  ngOnInit() {
    console.log('formGroup:', this.formGroup);
    console.log('formGroup value:', this.formGroup.value);
    console.log('progetti:', this.formGroup.get('progetti'));
  }
  colonneServizi: TableColumn[] = [
    { key: 'idServizio', label: 'ID Servizio', sortable: true, class: 'col-id' },
    { key: 'servizio', label: 'Servizio', sortable: true, class: 'col-nome' },
    { key: 'categoria', label: 'Categoria', sortable: true, class: 'col-desc' },
  ];
  expanded: boolean[] = [];
  get progetti(): FormArray {
    return this.formGroup.get('progetti') as FormArray;
  }
  readonly maxNoteLength = 500;



}
