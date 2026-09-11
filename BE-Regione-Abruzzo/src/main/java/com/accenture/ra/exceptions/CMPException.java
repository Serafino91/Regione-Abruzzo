package com.accenture.ra.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public class CMPException extends RuntimeException{

    @Getter
    private final TipoErroreInterface tipoErroreInterface;

    public CMPException(String messaggio, TipoErroreInterface tipoErroreInterface) {
            super(messaggio);
            this.tipoErroreInterface = tipoErroreInterface;
    }

}
