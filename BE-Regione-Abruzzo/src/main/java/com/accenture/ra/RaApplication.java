package com.accenture.ra;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class RaApplication {

    public static void main(String[] args) {
        SpringApplication.run(RaApplication.class, args);
    }

}
