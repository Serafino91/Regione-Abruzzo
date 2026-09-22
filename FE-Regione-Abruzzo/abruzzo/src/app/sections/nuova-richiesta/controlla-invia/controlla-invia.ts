import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  @Input() formGroupNote!: FormGroup;
  @Input() nuovaRichiesta!: boolean;
  protected readonly ServiceName = ServiceName;
  protected readonly ServiceCategory = ServiceCategory;
  expanded: boolean[] = [];

  toggleCollapse(index: number): void {
    this.expanded[index] = !this.expanded[index];
  }

  readonly maxNoteLength = 500;

  get servizi(): FormArray {
    return this.formGroupServizi.get('servizi') as FormArray;
  }

  getParams(servizio: AbstractControl) {
    const params = (servizio.get('params') as FormGroup).value;
    return Object.entries(params).map(([key, val]: [string, any]) => [key, val?.value ?? val]);
  }
}
