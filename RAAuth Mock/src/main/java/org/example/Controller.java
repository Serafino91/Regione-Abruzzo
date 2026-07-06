package org.example;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class Controller {
    @PostMapping("/data/searchUser")
    public Map<String,Object> searchUser() {

        return Map.of(
                "nome", "Gianluca",
                "cognome", "D'Agostino",
                "CF", "DGSGLC90A01B354X",
                "abilitato", true,
                "spid", true,
                "ruoli", List.of(
                        Map.of(
                                "cod", 100,
                                "desc", "ADMIN",
                                "label", "ADMIN",
                                "isChecked", true
                        ),
                        Map.of(
                                "cod", 104,
                                "desc", "EXT_AUTH",
                                "label", "EXT_AUTH",
                                "isChecked", true
                        )
                )
        );
    }

}
