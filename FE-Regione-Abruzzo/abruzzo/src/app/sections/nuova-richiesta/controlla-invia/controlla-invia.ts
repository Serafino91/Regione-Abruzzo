import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {ServiceCategory} from "../../../constants/service-category.constants";
import {ServiceName} from "../../../constants/service-name.constants";
import {LabelServizio} from '../../../components/label-servizio/label-servizio';
import {ProgettoDetailCard} from "../../../components/progetto-detail-card/progetto-detail-card";

@Component({
  selector: 'app-controlla-invia',
  imports: [ReactiveFormsModule, LabelServizio, ProgettoDetailCard],
  templateUrl: './controlla-invia.html',
  styleUrl: './controlla-invia.css',
  standalone: true,
})
export class ControllaInvia {
  @Input() formGroupProgetto!: FormGroup;
  @Input() formGroupServizi!: FormGroup;
  @Input() nuovaRichiesta!: boolean;

  expanded: boolean[] = [];

  toggleCollapse(index: number): void {
    this.expanded[index] = !this.expanded[index];
  }

  readonly maxNoteLength = 500;
  formGroupNote = new FormGroup({
    note: new FormControl('', [Validators.maxLength(this.maxNoteLength)]),
  });

  get servizi(): FormArray {
    return this.formGroupServizi.get('servizi') as FormArray;
  }

  getParams(servizio: AbstractControl) {
    return Object.entries((servizio.get('params') as FormGroup).value);
  }

  protected readonly ServiceName = ServiceName;
  protected readonly ServiceCategory = ServiceCategory;
}
