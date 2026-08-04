package com.accenture.ra.dto.request;

import com.accenture.ra.enums.DelegateType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateDelegationRequest {

    private Long targetUserId;

    @Pattern(regexp = "^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$", message = "Formato Codice Fiscale non valido")
    private String fiscalCode;

    @Email(message = "Formato Email non valido")
    private String email;

    @NotNull(message = "Il tipo di delega è obbligatorio")
    private DelegateType delegateType;

    private List<Long> projectIds;
}