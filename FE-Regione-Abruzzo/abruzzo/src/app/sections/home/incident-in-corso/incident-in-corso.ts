import { Component, Input } from '@angular/core';
import { IncidentCard } from './components/incident-card/incident-card';
import {SectionHeader} from '../../../components/section-header/section-header';

@Component({
  selector: 'app-incident-in-corso',
  imports: [IncidentCard, SectionHeader],
  templateUrl: './incident-in-corso.html',
  styleUrl: './incident-in-corso.css',
  standalone: true,
})
export class IncidentInCorso {}
