import { TicketStateModel } from './ticketStateModel.model';
import { CategoriaTicketModel } from './categoriaTicket.model';

export class TicketModel {
    id!: number;
    code!: string;
    state!: TicketStateModel;
    category!: CategoriaTicketModel;
    subcategory!: string;
    openingDate?: string;
    applicant!: string;
}

export interface IncidentTicketModel {
  statoIncident: string;
  codice: string;
  categoria: CategoriaTicketModel;
  sottoCategoria: string;
  dataApertura: string;
  richiedente: string;
}
