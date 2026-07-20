import { Component } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Url } from '../../components/url/url';


@Component({
  selector: 'app-nuovo-incident',
  imports: [FormsModule, ReactiveFormsModule, Url],
  templateUrl: './nuovo-incident.html',
  styleUrl: './nuovo-incident.css',
  standalone: true,
})
export class NuovoIncident {
  readonly maxNoteLength: number = 500;
  incidentForm = new FormGroup({
    categoria: new FormControl('', Validators.required),
    sottocategoria: new FormControl('', Validators.required),
    idProgetto: new FormControl('', Validators.required),
    idServizio: new FormControl('', Validators.required),
    descrizione: new FormControl('', [Validators.maxLength(this.maxNoteLength)]),
    sede: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    file: new FormControl<File | null>(null),
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      this.incidentForm.get('file')?.setValue(input.files[0]);
    }
  }

  inviaIncident() {}
}
