import { ServizioModel } from './servizioModel';
import { CategoriaModel } from './categoria.model';
import { StatoModel } from './stato.model';
import { ProgettoModel } from './progetto.model';

export interface RichiestaProjectDto {
  id: number;
  name: string;
  destinationLink?: string;
  description?: string;
  createAt?: string;
  updateAt?: string;
  services?: ServizioModel[];
}

export class RichiestaModel {
  requestId!: string;
  state!: StatoModel;
  project!: RichiestaProjectDto;
  service!: ServizioModel;
  services: ServizioModel[] = [];
  category?: CategoriaModel;
  sendFrom!: string;
  sendTo!: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface RichiestaDetailResponse {
  requestDetail: RichiestaModel;
}
