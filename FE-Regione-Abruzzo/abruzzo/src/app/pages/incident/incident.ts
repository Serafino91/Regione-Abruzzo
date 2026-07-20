import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../components/button/button';
import { Url } from '../../components/url/url';
import { FiltriIncident } from '../../sections/incident/filtri-incident/filtri-incident';
import { TabellaIncident } from '../../sections/incident/tabella-incident/tabella-incident';

@Component({
  selector: 'app-incident',
  imports: [Url, RouterLink, FiltriIncident, TabellaIncident],
  standalone: true,
  templateUrl: './incident.html',
  styleUrl: './incident.css',
})
export class Incident {}
