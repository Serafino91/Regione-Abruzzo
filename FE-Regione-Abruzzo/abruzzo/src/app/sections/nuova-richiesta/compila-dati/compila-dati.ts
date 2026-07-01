import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-compila-dati',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './compila-dati.html',
  styleUrl: './compila-dati.css',
})

export class CompilaDati {
  @Input({ required: true })
  formGroup!: FormGroup;

  get serviziArray(): FormArray {
    return this.formGroup.get('servizi') as FormArray;
  }

  getParamsGroup(index: number): FormGroup {
    return this.serviziArray.at(index).get('params') as FormGroup;
  }

  getParamNames(index: number): string[] {
    return Object.keys(this.getParamsGroup(index).controls);
  }
}

