import { TicketStateModel } from './ticketStateModel.model';

export class TicketModel {
    id!: number;
    code!: string;
    state!: TicketStateModel;
    category!: string;
    subcategory!: string;
    openingDate?: string;
    applicant!: string;
}

export interface IncidentTicketModel {
    statoIncident: string;
    codice: string;
    categoria: string;
    sottoCategoria: string;
    dataApertura: string;
    richiedente: string;
}