package com.accenture.ra.dto.response;

import com.accenture.ra.enums.DelegateType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class DelegationResponse {

    private Long id;
    private LocalDateTime delegationDate;
    private DelegateType delegateType;
    private boolean active;
    private UserResponse user;
    private List<ProjectDetailResponse> projects;
}