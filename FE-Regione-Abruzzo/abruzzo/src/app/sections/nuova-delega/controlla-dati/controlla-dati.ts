import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {ProgettoAccordion} from "../../../components/progetto-accordion/progetto-accordion";
import {PermessiCard} from "../../../components/permessi-card/permessi-card";

@Component({
  selector: 'app-controlla-dati',
  imports: [ReactiveFormsModule, ProgettoAccordion, PermessiCard],
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

  expanded: boolean[] = [];
  get progetti(): FormArray {
    return this.formGroup.get('progetti') as FormArray;
  }

  readonly maxNoteLength = 500;
}
