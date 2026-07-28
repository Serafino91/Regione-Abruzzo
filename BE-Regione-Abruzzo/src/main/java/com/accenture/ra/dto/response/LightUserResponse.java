package com.accenture.ra.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LightUserResponse {
    private Long id;
    private String fiscalCode;
    private String firstName;
    private String lastName;
    private String email;
}