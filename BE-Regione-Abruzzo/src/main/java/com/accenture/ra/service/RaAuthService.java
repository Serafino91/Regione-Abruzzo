package com.accenture.ra.service;

import com.accenture.ra.dto.response.RaAuthUserResponse;

public interface RaAuthService {

    RaAuthUserResponse searchUser(
            String codiceFiscale,
            String accessToken);

}