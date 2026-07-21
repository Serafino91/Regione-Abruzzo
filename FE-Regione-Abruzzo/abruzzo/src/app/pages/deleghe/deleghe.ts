import { Component } from '@angular/core';
import { Url } from '../../components/url/url';
import { RouterLink } from '@angular/router';
import { FiltriDeleghe } from '../../sections/deleghe/filtri-deleghe/filtri-deleghe';
import { TabellaDeleghe } from '../../sections/deleghe/tabella-deleghe/tabella-deleghe';

@Component({
  selector: 'app-deleghe',
  imports: [Url, RouterLink, FiltriDeleghe, TabellaDeleghe],
  standalone: true,
  templateUrl: './deleghe.html',
  styleUrl: './deleghe.css',
})
export class Deleghe {

}
