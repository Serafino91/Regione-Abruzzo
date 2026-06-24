import { Injectable } from '@angular/core';
import { ChiamateApiUrl } from '../constants/chiamate-api-url.constants';
import { ServizioModel } from '../model/servizioModel';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { RichiestaModel } from '../model/richiestaModel';

@Injectable({
  providedIn: 'root',
})
export class RichiesteService {
  constructor(private http: HttpClient) {}

  getAllRichieste() {
    return this.http
      .get<{ requestsList: RichiestaModel[] }>(ChiamateApiUrl.BASE_URL_RICHIESTA)
      .pipe(map((resp) => resp.requestsList));
  }

  getRichieste(id: number) {
    return this.http.get<RichiestaModel>(`${ChiamateApiUrl.BASE_URL_RICHIESTA}/${id}`);
  }

  createServizio(richiesta: RichiestaModel) {
    return this.http.post<RichiestaModel>(ChiamateApiUrl.BASE_URL_RICHIESTA, richiesta);
  }

  filterRichieste(richiesta: RichiestaModel) {
    return this.http.post<RichiestaModel>(ChiamateApiUrl.BASE_URL_RICHIESTA + '/filter', richiesta);
  }

  updateRichieste(richiesta: RichiestaModel) {
    return this.http.patch<RichiestaModel>(
      `${ChiamateApiUrl.BASE_URL_RICHIESTA}/${richiesta.requestId}`,
      richiesta,
    );
  }

  deleteRichieste(id: number) {
    return this.http.delete<void>(`${ChiamateApiUrl.BASE_URL_SERVIZI}/${id}`);
  }
}

