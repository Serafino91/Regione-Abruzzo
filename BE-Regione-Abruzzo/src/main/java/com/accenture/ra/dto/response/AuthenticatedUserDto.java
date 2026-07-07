package com.accenture.ra.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class AuthenticatedUserDto {

    private String subject;
    private String email;
    private String name;

    private Map<String, Object> claims;
}
