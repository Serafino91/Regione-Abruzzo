
package com.accenture.ra.service;

import java.util.Map;

public interface RaAuthService {

    Map<String, Object> getRolesForUser(String accessToken);

}
