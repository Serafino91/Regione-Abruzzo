package com.accenture.ra.dto.response;

import com.accenture.ra.enums.DelegateType;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DelegationResponse {

    private Long id;
    private LocalDateTime delegationDate;
    private DelegateType delegateType;
    private boolean active;
    private LightUserResponse user;
    private List<ProjectDetailResponse> projects;
    private LightUserResponse delegatedBy;
}