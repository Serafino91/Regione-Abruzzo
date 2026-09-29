import { ServizioModel } from './servizioModel';

export class ProgettoModel {
  idProgetto!: number;
  nome!: string;
  destinationLink!: string;
  description!: string;
  dataCreazione?: string;
  dataScadenza?: string;
  dataUltimaModifica?: string;
  servizi?: ServizioModel[] = [];
}
