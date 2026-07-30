import { ParamentroModel } from './parametro.model';
import { CategoriaModel } from './categoria.model';

export class ServizioModel {
  id!: string;
  type!: CategoriaModel;
  item!: string;
  base!: boolean;
  optional!: boolean;
  quantity!: string | null;
  durationMonths!: string | null;
  params!: ParamentroModel[];
}
