package com.accenture.ra.exceptions;

import java.time.LocalDateTime;

public class ErrorResponse {
    private int status;
    private String error;
    private String descrizione;
    private LocalDateTime timestamp;

    public  ErrorResponse(int status, String error, String descrizione, LocalDateTime timestamp) {
        this.status = status;
        this.error = error;
        this.descrizione = descrizione;
        this.timestamp = timestamp;
    }

    public int getStatus() {
        return status;
    }
    public String getError() {
        return error;
    }
    public String getDescrizione() {
        return descrizione;
    }
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}