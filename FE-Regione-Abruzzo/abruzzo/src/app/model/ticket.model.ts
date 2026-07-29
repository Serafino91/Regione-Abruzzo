import { TicketStateModel } from './ticketStateModel.model';

export class TicketModel {

  id!: number;
  code!: string;
  state!:TicketStateModel;
  category!: string;
  subcategory!: string;
  openingDate?: string;
  applicant!: string;
}

