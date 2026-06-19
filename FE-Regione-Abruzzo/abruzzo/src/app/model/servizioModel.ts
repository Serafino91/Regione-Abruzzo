import { ParamentroModel } from './parametro.model';

export class ServizioModel {
  id!: string;
  type!: string;
  item!: string;
  base!: boolean;
  optional!: boolean;
  quantity!: string | null;
  durationMonths!: string | null;
  params!: ParamentroModel[];
}
