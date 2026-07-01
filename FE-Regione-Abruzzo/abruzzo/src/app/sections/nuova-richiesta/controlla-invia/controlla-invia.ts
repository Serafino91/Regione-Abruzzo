import { Component, Input } from '@angular/core';
import {AbstractControl, FormArray, FormGroup } from '@angular/forms';
import {ServiceCategory} from "../../../constants/service-category.constants";
import {ServiceName} from "../../../constants/service-name.constants";

@Component({
  selector: 'app-controlla-invia',
  imports: [],
  templateUrl: './controlla-invia.html',
  styleUrl: './controlla-invia.css',
  standalone: true,
})
export class ControllaInvia {
  @Input() formGroupProgetto!: FormGroup;
  @Input() formGroupServizi!: FormGroup;


  get servizi(): FormArray {
    return this.formGroupServizi.get('servizi') as FormArray;
  }

  getParams(servizio: AbstractControl) {
    return Object.entries((servizio.get('params') as FormGroup).value);
  }


  protected readonly ServiceName = ServiceName;
  protected readonly ServiceCategory = ServiceCategory;
}
