import { Injectable } from '@angular/core';
import { ChiamateApiUrl } from '../constants/chiamate-api-url.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketModel } from '../model/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  constructor(private http: HttpClient) {}

  getTickets(): Observable<TicketModel[]> {
    return this.http.get<TicketModel[]>(ChiamateApiUrl.BASE_URL_INCIDENT);
  }
}
