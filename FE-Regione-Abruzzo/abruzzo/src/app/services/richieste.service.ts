import { Injectable } from '@angular/core';
import { ChiamateApiUrl } from '../constants/chiamate-api-url.constants';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { RichiestaDetailResponse, RichiestaModel } from '../model/richiestaModel';
import {FiltroRichiestaCriteriaModel} from '../model/filtro-richiesta-criteria.model';

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
  getRichiesta(id: string) {
    return this.http.get<RichiestaDetailResponse>(`${ChiamateApiUrl.BASE_URL_RICHIESTA}/${id}`);
  }
  createServizio(richiesta: RichiestaModel) {
    return this.http.post<RichiestaModel>(ChiamateApiUrl.BASE_URL_RICHIESTA, richiesta);
  }
  /*
  filterRichieste(richiesta: RichiestaModel) {
    return this.http.post<RichiestaModel>(ChiamateApiUrl.BASE_URL_RICHIESTA + '/filter', richiesta);
  }
  */


  updateRichieste(richiesta: RichiestaModel) {
    return this.http.patch<RichiestaModel>(
      `${ChiamateApiUrl.BASE_URL_RICHIESTA}/${richiesta.requestId}`,
      richiesta,
    );
  }

  deleteRichieste(id: number) {
    return this.http.delete<void>(`${ChiamateApiUrl.BASE_URL_SERVIZI}/${id}`);
  }

  filterRichieste(criteria: FiltroRichiestaCriteriaModel) {
    return this.http
      .post<{ requestsList: RichiestaModel[] }>(
        `${ChiamateApiUrl.BASE_URL_RICHIESTA}/filter`,
        criteria
      )
      .pipe(map(resp => resp.requestsList));
  }

}

