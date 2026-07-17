package com.accenture.ra.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private String fiscalNumber;
    private String givenName;
    private String familyName;
    private String email;
    private String pec;
    private String mobilePhone;
}
