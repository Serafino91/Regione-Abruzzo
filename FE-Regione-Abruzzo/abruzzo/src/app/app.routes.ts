import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { Home } from './pages/home/home';
import NuovaRichiesta from './pages/nuova-richiesta/nuova-richiesta';
import { Richieste } from './pages/richieste/richieste';
import { Catalogo } from './pages/catalogo/catalogo';
import { Incident } from './pages/incident/incident';
import { Progetti } from './pages/progetti/progetti';
import { NuovoIncident } from './pages/nuovo-incident/nuovo-incident';
import { Accreditamento } from './pages/accreditamento/accreditamento';
import { DettaglioRichiesta } from './pages/dettaglio-richiesta/dettaglio-richiesta';
import { DettaglioServizio } from './pages/dettaglio-servizio/dettaglio-servizio';
import { NuovoServizio } from './pages/nuovo-servizio/nuovo-servizio';
import { DettaglioProgetto } from './pages/dettaglio-progetto/dettaglio-progetto';
import { PreAccesso } from "./pages/pre-accesso/pre-accesso";
import { NuovaDelega } from "./pages/nuova-delega/nuova-delega";
import { Deleghe } from "./pages/deleghe/deleghe";
import { PreAccreditamento } from "./pages/pre-accreditamento/pre-accreditamento";
import { DettaglioDelega } from './pages/dettaglio-delega/dettaglio-delega';
import {DettaglioIncident} from './pages/dettaglio-incident/dettaglio-incident';
import { Ticket } from './pages/ticket/ticket';
import { DettaglioRichiestaTicket } from './pages/dettaglio-richiesta-ticket/dettaglio-richiesta-ticket';
import { DettaglioIncidentTicket } from './pages/dettaglio-incident-ticket/dettaglio-incident-ticket';
import { DettaglioAccreditamentoTicket } from './pages/dettaglio-accreditamento-ticket/dettaglio-accreditamento-ticket';
import { DettaglioIncident } from './pages/dettaglio-incident/dettaglio-incident';
import { Login } from './pages/login/login';

// Lista completa dei ruoli da usare in Dev
const ALL_DEV_ROLES = [
  'ROLE_USER',
  'ROLE_ADMIN',
  'DELEGATE_MASTER',
  'DELEGATE_CREATOR',
  'DELEGATE_VIEWER'
];

export const routes: Routes = [
  // Redirect principale -> prova ad andare a home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // --- ROTTE PUBBLICHE ---
  { path: 'pre-accesso', component: PreAccesso },
  { path: 'login', component: Login },

  // --- ROTTE PROTETTE ---
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard],
    data: { roles: ALL_DEV_ROLES }
  },
  {
    path: 'pre-accreditamento',
    component: PreAccreditamento,
    canActivate: [authGuard],
    data: { roles: ALL_DEV_ROLES }
  },

  // Progetti
  {
    path: 'home/progetti',
    component: Progetti,
    canActivate: [authGuard],
    data: { roles: ALL_DEV_ROLES }
  },
  {
    path: 'home/progetti/dettaglio-progetto/:id',
    component: DettaglioProgetto,
    canActivate: [authGuard],
    data: { roles: ALL_DEV_ROLES }
  },

  // Deleghe
  {
    path: 'home/deleghe',
    component: Deleghe,
    canActivate: [authGuard],
    data: { roles: ALL_DEV_ROLES }
  },
  {
    path: 'home/deleghe/nuova-delega',
    component: NuovaDelega,
    canActivate: [authGuard],
    data: { roles: ALL_DEV_ROLES }
  },
  {
    path: 'home/deleghe/dettaglio-delega',
    component: DettaglioDelega,
    canActivate: [authGuard],
    data: { roles: ALL_DEV_ROLES }
  },

  // Richieste
  {
    path: 'home/richieste',
    component: Richieste,
    canActivate: [authGuard],
    data: { roles: ALL_DEV_ROLES }
  },
  {
    path: 'home/richieste/nuova-richiesta',
    component: NuovaRichiesta,
    canActivate: [authGuard],
    data: { roles: ALL_DEV_ROLES }
  },
  {
    path: 'home/richieste/dettaglio-richiesta/:id',
    component: DettaglioRichiesta,
    canActivate: [authGuard],
    data: { roles: ALL_DEV_ROLES }
  },

  // Incident
  {
    path: 'home/incident',
    component: Incident,
    canActivate: [authGuard],
    data: { roles: ALL_DEV_ROLES }
  },
  {
    path: 'home/incident/nuovo-incident',
    component: NuovoIncident,
    canActivate: [authGuard],
    data: { roles: ALL_DEV_ROLES }
  },
  {
    path: 'home/incident/dettaglio-incident/:id',
    component: DettaglioIncident,
    canActivate: [authGuard],
    data: { roles: ALL_DEV_ROLES }
  },

  // Catalogo
  {
    path: 'home/catalogo',
    component: Catalogo,
    canActivate: [authGuard],
    data: { roles: ALL_DEV_ROLES }
  },
  {
    path: 'home/catalogo/dettaglio-servizio/:id',
    component: DettaglioServizio,
    canActivate: [authGuard],
    data: { roles: ALL_DEV_ROLES }
  },

  // Accreditamento
  {
    path: 'home/accreditamento',
    component: Accreditamento,
    canActivate: [authGuard],
    data: { roles: ALL_DEV_ROLES }
  },

  // 💡 FIX FONDAMENTALE: Se digiti/clicchi un link non valido, ti riporta in Home SENZA fare il logout!
  { path: '**', redirectTo: 'home' }
];
