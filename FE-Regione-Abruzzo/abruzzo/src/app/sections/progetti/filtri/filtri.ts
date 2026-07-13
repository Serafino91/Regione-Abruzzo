import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';
import { ServiziService } from '../../../services/servizi.service';
import { RequestState } from '../../../constants/request-state-constants';

@Component({
  selector: 'app-filtri',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './filtri.html',
  styleUrl: './filtri.css',
})
export class Filtri {

  filtersForm = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl('')

  });

  cercaProgetti() {

  }


}
