package org.example;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

@RestController
public class Controller {

    @PostMapping("/adfs/oauth2/token")
    public Map<String,Object> token() {

        return Map.of(
                "access_token", UUID.randomUUID().toString(),
                "token_type", "Bearer",
                "expires_in", 3600
        );
    }


    @GetMapping("/ping")
    public String ping() {
        return "ADFS_OK";
    }


}
