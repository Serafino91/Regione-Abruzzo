package com.accenture.ra.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SpidUserDto {
    private String nome;
    private String cognome;
    private String codiceFiscale;
    private String email;
    private String spidCode; // Identificativo univoco SPID dell'utente
}