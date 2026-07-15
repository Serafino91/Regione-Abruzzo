import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NuovaRichiesta } from './pages/nuova-richiesta/nuova-richiesta';
import { Richieste } from './pages/richieste/richieste';
import { Catalogo } from './pages/catalogo/catalogo';
import { Incident } from './pages/incident/incident';
import { Progetti } from './pages/progetti/progetti';
import { NuovoIncident } from './pages/nuovo-incident/nuovo-incident';
import { Accreditamento } from './pages/accreditamento/accreditamento';
import { Login } from './pages/login/login';
import {DettaglioRichiesta} from './pages/dettaglio-richiesta/dettaglio-richiesta';
import { DettaglioServizio } from './pages/dettaglio-servizio/dettaglio-servizio';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'home/progetti', component: Progetti },
  { path: 'home/richieste', component: Richieste },
  { path: 'home/incident', component: Incident },
  { path: 'home/catalogo', component: Catalogo },
  { path: 'home/accreditamento', component: Accreditamento },
  { path: 'home/richieste/nuova-richiesta', component: NuovaRichiesta },
  { path: 'home/incident/nuovo-incident', component: NuovoIncident },
  { path: 'home/richieste/dettaglio-richiesta/:id', component: DettaglioRichiesta },
  { path: 'home/catalogo/dettaglio-servizio/:id',  component: DettaglioServizio},
  { path: 'login', component: Login },
];
