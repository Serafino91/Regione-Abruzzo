import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { DynamicForm } from '../../../components/dynamic-form/dynamic-form';
import { ServizioModel } from '../../../model/servizioModel';
import { ServiziService} from '../../../services/servizi.service';
import { ParamentroModel } from '../../../model/parametro.model';

@Component({
  selector: 'app-seleziona-servizio',
  imports: [FormsModule, DynamicForm],
  templateUrl: './seleziona-servizio.html',
  styleUrl: './seleziona-servizio.css',
  standalone: true,
})
export class SelezionaServizio implements OnInit {

  servizi: ServizioModel[] = [];
  servizio?: ServizioModel;
  selectedServiceId = '';
  public params: ParamentroModel[] = [];
  values: Record<string, any> = {};

  constructor(private serviziService: ServiziService) {}


  ngOnInit(): void {
    this.serviziService.getServizi().subscribe({
      next: (res) => {
        this.servizi = res;
      },
      error: (err) => console.error(err),
    });
  }

  onServizioChange(id: string): void {
    this.servizio = this.servizi.find((s) => s.id === id);
    if (this.servizio)
      this.params = this.servizio.params;
  }
}
