package com.accenture.ra.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GestoreEccezioni {

    @ExceptionHandler(CMPException.class)
    public ResponseEntity<ErrorResponse> gestisciCMPException(CMPException ex) {

        TipoErroreInterface tipo = ex.getTipoErroreInterface();
        ErrorResponse body = new ErrorResponse(
                tipo.getStatoHttp(),
                tipo.getDescrizione(),
                ex.getMessage(),
                LocalDateTime.now()
        );

        return ResponseEntity
                .status(HttpStatus.valueOf(tipo.getStatoHttp()))
                .body(body);
    }
}
