import { ServizioModel } from './servizioModel';
import { StatoModel } from './stato.model';
import { CategoriaModel } from './categoria.model';

export interface RichiestaProjectDto {
  id: number;
  name: string;
  destinationLink?: string;
  description?: string;
  createAt?: string;
  updateAt?: string;
}

export class RichiestaSafeModel {
  requestId!: string;
  state?: string;
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
  requestDetail: RichiestaSafeModel;
}
