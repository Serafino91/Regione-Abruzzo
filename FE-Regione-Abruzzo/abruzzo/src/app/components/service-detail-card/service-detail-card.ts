import { Component, Input } from '@angular/core';
import { ServiceCategory } from '../../constants/service-category.constants';
import { ServiceName } from '../../constants/service-name.constants';
import { ServizioModel } from '../../model/servizioModel';
import { ParamentroModel } from '../../model/parametro.model';

@Component({
  selector: 'app-service-detail-card',
  imports: [],
  standalone: true,
  templateUrl: './service-detail-card.html',
  styleUrl: './service-detail-card.css',
})
export class ServiceDetailCard {

  @Input() servizio!: ServizioModel;
  @Input() params: ParamentroModel[] = [];

  protected readonly ServiceCategory = ServiceCategory;
  protected readonly ServiceName = ServiceName;
}
