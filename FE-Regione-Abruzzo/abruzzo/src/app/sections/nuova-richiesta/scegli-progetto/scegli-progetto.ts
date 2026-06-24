import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-scegli-progetto',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './scegli-progetto.html',
  styleUrl: './scegli-progetto.css',
  standalone: true,
})
export class ScegliProgetto {
  onSubmit(form: any) {
    console.log(form.value);
  }

  @Input({ required: true })
  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup.addControl('selezione', new FormControl('', Validators.required));
    this.formGroup.addControl('dataDa', new FormControl(''));
    this.formGroup.addControl('dataA', new FormControl(''));
  }

}
