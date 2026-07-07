package com.accenture.ra.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class UserInfo {

    private String nome;
    private String cognome;
    private String CF;
    private String email;
    private Boolean abilitato;
    private Boolean spid;

    private List<RuoloInfo> ruoli;

}