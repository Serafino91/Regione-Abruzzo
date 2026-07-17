package com.accenture.ra.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class addUserForAppRequestDto {
    @NotNull
    private String fiscalNumber;
    @NotNull
    private String givenName;
    @NotNull
    private String familyName;
    @NotNull
    private String email;

    private String pec;
    @NotNull
    private String mobilePhone;
}
