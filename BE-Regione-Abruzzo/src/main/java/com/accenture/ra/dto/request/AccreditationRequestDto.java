package com.accenture.ra.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccreditationRequestDto {

    @NotNull
    String fiscalCode;
    @NotNull
    String accreditationStatus;
}
