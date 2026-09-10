package com.accenture.ra.exceptions;

public enum TipoErroreBase implements TipoErroreInterface {

    NON_TROVATO(404, "Risorsa non trovata"),
    VALIDAZIONE(400, "Errore di validazione"),
    ERRORE_GENERICO(500, "Errore interno"),
    ENTITA_GIA_PRESENTE(400, "Entita' gia' presente"),
    NON_AUTORIZZATO(403, "Accesso negato"),
    MODULO_SOSPESO(403, "Accesso sospeso"),
    UTENTE_NON_ATTIVO(301, "Utente in stato NON_ATTIVO");

    private final int statoHttp;
    private final String descrizione;

    private TipoErroreBase(int statoHttp, String descrizione) {
        this.statoHttp = statoHttp;
        this.descrizione = descrizione;
    }

    public int getStatoHttp() {
        return this.statoHttp;
    }

    public String getDescrizione() {
        return this.descrizione;
    }
}
