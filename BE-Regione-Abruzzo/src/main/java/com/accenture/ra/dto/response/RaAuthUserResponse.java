package com.accenture.ra.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class RaAuthUserResponse {

    private List<UserInfo> users;

}