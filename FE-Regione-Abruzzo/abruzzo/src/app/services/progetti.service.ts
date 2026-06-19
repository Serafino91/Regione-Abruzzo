import { Injectable } from '@angular/core';
import { ChiamateApiUrl } from '../constants/chiamate-api-url.constants';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ProgettoModel } from '../model/progetto.model';

@Injectable({
  providedIn: 'root',
})
export class ProgettiService {
  constructor(private http: HttpClient) {}

  getProgetti() {
    return this.http
      .get<{ serviceDetail: ProgettoModel[] }>(ChiamateApiUrl.BASE_URL_PROGETTI)
      .pipe(map((resp) => resp.serviceDetail));
  }

  getProgetto(id: number) {
    return this.http.get<ProgettoModel>(`${ChiamateApiUrl.BASE_URL_PROGETTI}/${id}`);
  }

  createProgetto(progetto: ProgettoModel) {
    return this.http.post<ProgettoModel>(ChiamateApiUrl.BASE_URL_PROGETTI, progetto);
  }

  filterProgetto(progetto: ProgettoModel) {
    return this.http.post<ProgettoModel>(ChiamateApiUrl.BASE_URL_PROGETTI + '/filter', progetto);
  }

  updateServizio(progetto: ProgettoModel) {
    return this.http.patch<ProgettoModel>(
      `${ChiamateApiUrl.BASE_URL_SERVIZI}/${progetto.idProgetto}`,
      progetto,
    );
  }

  deleteProgetto(id: number) {
    return this.http.delete<void>(`${ChiamateApiUrl.BASE_URL_SERVIZI}/${id}`);
  }
}
