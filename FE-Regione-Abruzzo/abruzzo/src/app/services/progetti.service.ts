import { Injectable } from '@angular/core';
import { ChiamateApiUrl } from '../constants/chiamate-api-url.constants';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ProgettoModel } from '../model/progetto.model';
import {FiltroProgettoCriteriaModel} from '../constants/filtro-progetto-criteria.model';

@Injectable({
  providedIn: 'root',
})
export class ProgettiService {
  constructor(private http: HttpClient) {}

  getProgetti() {
    return this.http.get<{ projectsList: ProgettoModel[] }>(ChiamateApiUrl.BASE_URL_PROGETTI).pipe(
      map((resp) => {
        return resp.projectsList;
      }),
    );
  }

  getProgetto(id: string) {
    return this.http.get<ProgettoModel>(`${ChiamateApiUrl.BASE_URL_PROGETTI}/${id}`);
  }

  createProgetto(progetto: ProgettoModel) {
    return this.http.post<ProgettoModel>(ChiamateApiUrl.BASE_URL_PROGETTI, progetto);
  }

  checkProgettoEsiste(nome: string, destinationLink: string) {
    return this.http.get<boolean>(`${ChiamateApiUrl.BASE_URL_PROGETTI}/${nome}/${destinationLink}`, {
    });
  }

  updateServizio(progetto: ProgettoModel) {
    return this.http.patch<ProgettoModel>(
      `${ChiamateApiUrl.BASE_URL_SERVIZI}/${progetto.idProgetto}`,
      progetto,
    );
  }

  filterProgetto(criteria: FiltroProgettoCriteriaModel) {
    return this.http
      .post<{
        projectsList: ProgettoModel[];
      }>(`${ChiamateApiUrl.BASE_URL_PROGETTI}/filter`, criteria)
      .pipe(map((resp) => resp.projectsList));
  }

  deleteProgetto(id: number) {
    return this.http.delete<void>(`${ChiamateApiUrl.BASE_URL_SERVIZI}/${id}`);
  }
}
