import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NuovaRichiesta } from './pages/nuova-richiesta/nuova-richiesta';
import { Richieste } from './pages/richieste/richieste';
import { Catalogo } from './pages/catalogo/catalogo';
import { Incident } from './pages/incident/incident';
import { Progetti } from './pages/progetti/progetti';
import { NuovoIncident } from './pages/nuovo-incident/nuovo-incident';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'progetti', component: Progetti },
  { path: 'richieste', component: Richieste },
  { path: 'incident', component: Incident },
  { path: 'catalogo', component: Catalogo },
  { path: 'home/richieste/nuova-richiesta', component: NuovaRichiesta},
  { path: 'richieste/nuova-richiesta', component: NuovaRichiesta},
  { path: 'incident/nuovo-incident', component: NuovoIncident},
];
