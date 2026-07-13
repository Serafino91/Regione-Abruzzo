import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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
  newProgetto = false;
  readonly maxNoteLength = 500;

  ngOnInit() {
    this.formGroup.addControl('selezione', new FormControl('', Validators.required));
    this.formGroup.addControl('dataDa', new FormControl('', Validators.required));
    this.formGroup.addControl('dataA', new FormControl('', Validators.required));
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
