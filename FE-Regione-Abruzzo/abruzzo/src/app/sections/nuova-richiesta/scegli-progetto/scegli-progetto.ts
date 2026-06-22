import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-scegli-progetto',
  imports: [FormsModule],
  templateUrl: './scegli-progetto.html',
  styleUrl: './scegli-progetto.css',
  standalone: true,
})
export class ScegliProgetto {

  onSubmit(form: any) {
    console.log(form.value);
  }

  selezione = 0;
  servizio = '';
  dataDa: string | null = null;
  dataA: string | null = null;


}
