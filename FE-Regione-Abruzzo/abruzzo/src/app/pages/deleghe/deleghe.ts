import { Component } from '@angular/core';
import { FiltriDeleghe } from '../../sections/deleghe/filtri-deleghe/filtri-deleghe';
import { TabellaDeleghe } from '../../sections/deleghe/tabella-deleghe/tabella-deleghe';
import { PageHeader } from '../../components/page-header/page-header';

@Component({
  selector: 'app-deleghe',
  imports: [FiltriDeleghe, TabellaDeleghe, PageHeader],
  standalone: true,
  templateUrl: './deleghe.html',
  styleUrl: './deleghe.css',
})
export class Deleghe {}
