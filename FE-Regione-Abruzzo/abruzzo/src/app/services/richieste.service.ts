import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ChiamateApiUrl } from '../constants/chiamate-api-url.constants';
import { environment } from '../environments/environment';
import { RichiestaDetailResponse, RichiestaModel } from '../model/richiestaModel';
import { FiltroRichiestaCriteriaModel } from '../model/filtro-richiesta-criteria.model';
import { RichiestaSafeModel } from '../model/richiestaSafeModel';

@Injectable({
  providedIn: 'root',
})
export class RichiesteService {
  // Garantisce che le chiamate puntino a http://localhost:8080/request e non a localhost:4200
  private readonly baseUrl = `${environment.apiUrl}${ChiamateApiUrl.BASE_URL_RICHIESTA}`;

  constructor(private http: HttpClient) {}

  getAllRichieste(): Observable<RichiestaModel[]> {
    return this.http
      .get<{ requestsList: RichiestaModel[] }>(this.baseUrl)
      .pipe(map((resp) => resp?.requestsList || []));
  }

  getRichiesta(id: string): Observable<RichiestaDetailResponse> {
    return this.http.get<RichiestaDetailResponse>(`${this.baseUrl}/${id}`);
  }

  createRichiesta(richiesta: RichiestaSafeModel): Observable<RichiestaSafeModel> {
    return this.http.put<RichiestaSafeModel>(this.baseUrl, richiesta);
  }

  updateRichieste(richiesta: RichiestaModel): Observable<RichiestaModel> {
    return this.http.patch<RichiestaModel>(
      `${this.baseUrl}/${richiesta.requestId}`,
      richiesta
    );
  }

  deleteRichieste(id: number): Observable<void> {
    // 💡 CORRETTO: Usiamo questo endpoint invece di BASE_URL_SERVIZI
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  filterRichieste(criteria: FiltroRichiestaCriteriaModel): Observable<RichiestaModel[]> {
    return this.http
      .post<{ requestsList: RichiestaModel[] }>(`${this.baseUrl}/filter`, criteria)
      .pipe(map((resp) => resp?.requestsList || []));
  }
}