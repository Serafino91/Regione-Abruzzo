import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import NuovaRichiesta from './pages/nuova-richiesta/nuova-richiesta';
import { Richieste } from './pages/richieste/richieste';
import { Catalogo } from './pages/catalogo/catalogo';
import { Incident } from './pages/incident/incident';
import { Progetti } from './pages/progetti/progetti';
import { NuovoIncident } from './pages/nuovo-incident/nuovo-incident';
import { Accreditamento } from './pages/accreditamento/accreditamento';
import {DettaglioRichiesta} from './pages/dettaglio-richiesta/dettaglio-richiesta';
import { DettaglioServizio } from './pages/dettaglio-servizio/dettaglio-servizio';
import { NuovoServizio } from './pages/nuovo-servizio/nuovo-servizio';
import { DettaglioProgetto } from './pages/dettaglio-progetto/dettaglio-progetto';
import {PreAccesso} from "./pages/pre-accesso/pre-accesso";
import {NuovaDelega} from "./pages/nuova-delega/nuova-delega";
import {Deleghe} from "./pages/deleghe/deleghe";
import {PreAccreditamento} from "./pages/pre-accreditamento/pre-accreditamento";
import { DettaglioDelega } from './pages/dettaglio-delega/dettaglio-delega';
import {DettaglioIncident} from './pages/dettaglio-incident/dettaglio-incident';
import { Ticket } from './pages/ticket/ticket';
import { DettaglioRichiestaTicket } from './pages/dettaglio-richiesta-ticket/dettaglio-richiesta-ticket';
import { DettaglioIncidentTicket } from './pages/dettaglio-incident-ticket/dettaglio-incident-ticket';
import { DettaglioAccreditamentoTicket } from './pages/dettaglio-accreditamento-ticket/dettaglio-accreditamento-ticket';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'pre-accesso', component: PreAccesso },
  { path: 'home', component: Home },
  { path: 'pre-accreditamento', component: PreAccreditamento },
  { path: 'home/progetti', component: Progetti },
  { path: 'home/deleghe', component: Deleghe },
  { path: 'home/richieste', component: Richieste },
  { path: 'home/incident', component: Incident },
  { path: 'home/ticket/richieste-servizi', component: Ticket },
  { path: 'home/ticket/incident', component: Ticket },
  { path: 'home/ticket/accreditamenti', component: Ticket },
  { path: 'home/catalogo', component: Catalogo },
  { path: 'home/accreditamento', component: Accreditamento },
  { path: 'home/deleghe/nuova-delega', component: NuovaDelega },
  { path: 'home/richieste/nuova-richiesta', component: NuovaRichiesta },
  { path: 'home/incident/nuovo-incident', component: NuovoIncident },
  { path: 'home/richieste/dettaglio-richiesta/:id', component: DettaglioRichiesta },
  { path: 'home/catalogo/dettaglio-servizio/:id', component: DettaglioServizio },
  { path: 'home/catalogo/nuovo-servizio', component: NuovoServizio },
  { path: 'home/progetti/dettaglio-progetto/:id', component: DettaglioProgetto },
  { path: 'home/incident/dettaglio-incident/:id', component: DettaglioIncident },
  { path: 'home/deleghe/dettaglio-delega', component: DettaglioDelega },
  { path: 'home/ticket/richieste-servizi/dettaglio-richiesta-ticket', component: DettaglioRichiestaTicket },
  { path: 'home/ticket/incident/dettaglio-incident-ticket', component: DettaglioIncidentTicket },
  { path: 'home/ticket/accreditamenti/dettaglio-accreditamento-ticket', component: DettaglioAccreditamentoTicket }
];
