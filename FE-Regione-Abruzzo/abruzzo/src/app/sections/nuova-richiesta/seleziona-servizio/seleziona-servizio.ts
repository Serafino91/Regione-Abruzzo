import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-seleziona-servizio',
  imports: [FormsModule],
  templateUrl: './seleziona-servizio.html',
  styleUrl: './seleziona-servizio.css',
  standalone: true,
})
export class SelezionaServizio {
  onSubmit(form: any) {
    console.log(form.value);
  }
  selezione = 0;
  servizio = '';
  selezioni2: String[] = [];
  nomeVM: String = '';
  zonaDNS: String = '';
  pod: String = '';
  ram: String = '';
  boot: String = '';
  cpu: String = '';
  backup: String = '';
  servizioTecnico: String = '';
  servizioICT: String = '';
  ambiente: String = '';


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
