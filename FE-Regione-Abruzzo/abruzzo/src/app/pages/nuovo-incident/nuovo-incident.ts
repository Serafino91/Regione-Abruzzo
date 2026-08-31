import { Component } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { PageHeader } from '../../components/page-header/page-header';
import {AppModal} from '../../components/app-modal/app-modal';
import {Router} from '@angular/router';


@Component({
  selector: 'app-nuovo-incident',
  imports: [FormsModule, ReactiveFormsModule, PageHeader, AppModal],
  templateUrl: './nuovo-incident.html',
  styleUrl: './nuovo-incident.css',
  standalone: true,
})
export class NuovoIncident {


  constructor(private router: Router) {}

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
  showModal = false;
  showModalInvio = false;

  inviaIncident() {
    this.showModal= false;
    this.showModalInvio = true;
  }


  goToHome(): void {
    this.router.navigate(['home']);
  }

  vediDettaglio() {

  }
}
