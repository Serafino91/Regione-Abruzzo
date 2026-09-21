import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChiamateApiUrl } from '../constants/chiamate-api-url.constants';

import {
    RichiestaModel,
    RichiestaTicketModel,
    RichiestaDetailResponse
} from '../model/richiestaModel';

import { TicketModel, IncidentTicketModel } from '../model/ticket.model';

import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class TicketService {

    constructor(private http: HttpClient) { }

    getAllRichiesteTicket(): Observable<RichiestaTicketModel[]> {
        return this.http
            .get<{ requestsList: RichiestaModel[] }>(
                ChiamateApiUrl.BASE_URL_RICHIESTA
            )
            .pipe(
                map(resp =>
                    resp.requestsList.map(richiesta => ({
                        statoRichiesta: richiesta.state?.stateName ?? '',
                        idRichiesta: richiesta.requestId,
                        progetto: richiesta.project?.name ?? '',
                        servizio: richiesta.services[0]?.item ?? '',
                        categoria: "categoria 1",
                        dataInvio: richiesta.createdAt ?? ''
                    }))
                )
            );
    }

    getAllIncidentTicket(): Observable<IncidentTicketModel[]> {
        return this.http.
            get<TicketModel[]>(
                ChiamateApiUrl.BASE_URL_INCIDENT + '/list'
            ).pipe(
                map(resp =>
                    resp.map(incident => ({
                        statoIncident: incident.state?.name ?? '',
                        codice: incident.code,
                        categoria: incident.category ?? '',
                        sottoCategoria: incident.subcategory ?? '',
                        dataApertura: incident.openingDate ?? '',
                        richiedente: incident.applicant ?? ''
                    }))
                )
            );;
    }

    getRichiesta(id: string) {
        return this.http.get<RichiestaDetailResponse>(`${ChiamateApiUrl.BASE_URL_RICHIESTA}/${id}`);
    }

    getTicketDetail(code: string) {
        return this.http.get<TicketModel>(`${ChiamateApiUrl.BASE_URL_INCIDENT}/${code}`);
    }

}