import { Injectable } from '@angular/core';
import { ChiamateApiUrl } from '../constants/chiamate-api-url.constants';
import { ServizioModel } from '../model/servizioModel';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiziService {
  constructor(private http: HttpClient) {}

  getServizi() {
    return this.http
      .get<{ serviceDetail: ServizioModel[] }>(ChiamateApiUrl.BASE_URL_SERVIZI)
      .pipe(map((resp) => resp.serviceDetail));
  }

  getServiziDaCategoria(idCategoria:number) {
    return this.http
      .get<{ serviceDetail: ServizioModel[] }>(`${ChiamateApiUrl.BASE_URL_SERVIZI}/getServices/${idCategoria}`)
      .pipe(map((resp) =>
      {
        console.log("respCategoria:",resp);
       return resp.serviceDetail;
      }));
  }

  getServizio(id: number) {
    return this.http.get<ServizioModel>(`${ChiamateApiUrl.BASE_URL_SERVIZI}/${id}`);
  }

  createServizio(servizio: ServizioModel) {
    return this.http.post<ServizioModel>(ChiamateApiUrl.BASE_URL_SERVIZI, servizio);
  }

  filterServizio(servizio: ServizioModel) {
    return this.http.post<ServizioModel>(ChiamateApiUrl.BASE_URL_SERVIZI+'/filter', servizio);
  }

  updateServizio(servizio: ServizioModel) {
    return this.http.patch<ServizioModel>(
      `${ChiamateApiUrl.BASE_URL_SERVIZI}/${servizio.id}`,
      servizio,
    );
  }

  deleteServizio(id: number) {
    return this.http.delete<void>(`${ChiamateApiUrl.BASE_URL_SERVIZI}/${id}`);
  }
}

