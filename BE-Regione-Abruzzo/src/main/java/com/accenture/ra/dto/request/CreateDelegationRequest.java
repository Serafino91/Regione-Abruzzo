package com.accenture.ra.dto.request;

import com.accenture.ra.enums.DelegateType;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateDelegationRequest {

    @NotNull(message = "Delegator user ID is required")
    private Long delegatorUserId;

    // Target user (Existing ID OR New User credentials)
    private Long targetUserId;
    private String fiscalCode;
    private String email;

    @NotNull(message = "Delegate type is required")
    private DelegateType delegateType;

    private List<Long> projectIds;
}