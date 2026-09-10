package com.accenture.ra.exceptions;

import org.springframework.http.HttpStatus;

public class CMPException extends RuntimeException{

    private final TipoErroreInterface tipoErroreInterface;
    private final String messaggio;


    public CMPException(String messaggio, TipoErroreInterface tipoErroreInterface) {
            this.messaggio = messaggio;
            this.tipoErroreInterface = tipoErroreInterface;

    }
}
