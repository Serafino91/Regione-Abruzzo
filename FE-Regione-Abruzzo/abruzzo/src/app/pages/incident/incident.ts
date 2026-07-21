import { Component } from '@angular/core';
import { FiltriIncident } from '../../sections/incident/filtri-incident/filtri-incident';
import { TabellaIncident } from '../../sections/incident/tabella-incident/tabella-incident';
import { PageHeader } from '../../components/page-header/page-header';

@Component({
  selector: 'app-incident',
  imports: [FiltriIncident, TabellaIncident, PageHeader],
  standalone: true,
  templateUrl: './incident.html',
  styleUrl: './incident.css',
})
export class Incident {}
