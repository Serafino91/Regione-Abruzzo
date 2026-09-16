package com.accenture.ra.request;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceFilterCriteria {
    private Long categoryId;
    private List<Long> serviceIds;
}
