import { ServizioModel } from './servizioModel';

export class ProgettoModel {
  idProgetto!: number;
  nome!: string;
  destinationLink!: string;
  description!: string;
  dataCreazione?: string;
  dataUltimaModifica?: string;
  servizi?: ServizioModel[];
}
