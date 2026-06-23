import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ChiamateApiUrl } from '../constants/chiamate-api-url.constants';
import { CategoriaModel } from '../model/categoria.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private http: HttpClient) {}

  getCategorie() {
    return this.http
      .get<{ serviceType: CategoriaModel[] }>(ChiamateApiUrl.BASE_URL_CATEGORIA)
      .pipe(map((resp) =>{
        console.log("resp:",resp);
        return resp.serviceType;
      } ));
  }
}
