package com.accenture.ra;

import com.accenture.ra.config.RaTicketProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(RaTicketProperties.class)
public class RaApplication {

    public static void main(String[] args) {
        SpringApplication.run(RaApplication.class, args);
    }

}
