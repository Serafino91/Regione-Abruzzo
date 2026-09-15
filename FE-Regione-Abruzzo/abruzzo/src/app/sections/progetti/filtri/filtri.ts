import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccreditamentoRequest } from '../../../components/accreditamento-form/accreditamento-form';
import { FiltroRichiestaCriteriaModel } from '../../../model/filtro-richiesta-criteria.model';
import { FiltroProgettoCriteriaModel } from '../../../constants/filtro-progetto-criteria.model';

@Component({
  selector: 'app-filtri-progetti',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './filtri.html',
  styleUrl: './filtri.css',
})
export class Filtri {
  @Output() filtra = new EventEmitter<FiltroProgettoCriteriaModel>();
  @Output() reset = new EventEmitter<void>();

  filtersForm = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl(''),
  });

  applicaFiltri() {
    const idValue = this.filtersForm.controls.id?.value?.trim() ?? '';
    const nameValue = this.filtersForm.controls.name?.value?.trim().toLowerCase() ?? '';

    const criteria: FiltroProgettoCriteriaModel = {};

    if (idValue) {
      const parsedId = Number(idValue);
      if (!isNaN(parsedId)) {
        criteria.projectId = parsedId;
      }
    }

    if (nameValue) {
      criteria.name = nameValue;
    }

    this.filtra.emit(criteria);
  }

  resetFiltri() {
    this.filtersForm.reset();
    this.reset.emit();
  }
}
