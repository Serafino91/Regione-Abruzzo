package com.accenture.ra.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestFilterCriteria {

    private Long stateId;

    private Long categoryId;

    private List<Long> serviceIds;

    private LocalDateTime sendFrom;

    private LocalDateTime sendTo;

    private Long projectId;
}
