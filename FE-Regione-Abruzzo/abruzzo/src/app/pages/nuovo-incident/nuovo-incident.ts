import { Component } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nuovo-incident',
  imports: [FormsModule],
  templateUrl: './nuovo-incident.html',
  styleUrl: './nuovo-incident.css',
})
export class NuovoIncident {
  
  onSubmit(form: any) {
  console.log(form.value);
  }

  selezione = 0;
  servizio = '';
  idServizio = '';
  descrizioneBreve = '';
  descrizione = '';
  selezioni2: String[] = [];

  selezioni1: Record<number, string[]> = {
    1: ['Opzione 1', 'Opzione 2', 'Opzione 3'],
    2: ['Opzione A', 'Opzione B', 'Opzione C'],
    3: ['Opzione X', 'Opzione Y', 'Opzione Z'],
  };
  onSelezioneChange() {
    this.selezioni2 = this.selezioni1[this.selezione] || [];
  }

  form = new FormGroup({
    categoria: new FormControl('', Validators.required),
    servizio: new FormControl('', Validators.required),
    idServizio: new FormControl('', Validators.required),
    descrizione: new FormControl('', Validators.required),
    descrizioneBreve: new FormControl('', Validators.required),
  });


}
