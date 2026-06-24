import { ServizioModel } from './servizioModel';
import { CategoriaModel } from './categoria.model';
import { StatoModel } from './stato.model';

export interface RichiestaProjectDto {
  id: number;
  name: string;
  destinationLink?: string;
  description?: string;
  createAt: string;
  updateAt?: string;
}

export class RichiestaModel {
  requestId!: string;
  state!: StatoModel;
  project!: RichiestaProjectDto;
  service!: ServizioModel;
  category?: CategoriaModel;
  sendFrom!: string;
  sendTo!: string;
  createdAt!: string;
  updatedAt!: string;
}
