package com.store;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OnlineStoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(OnlineStoreApplication.class, args);
        System.out.println("=================================================");
        System.out.println("Online Store Spring Boot Backend Running on 8080");
        System.out.println("H2 Console: http://localhost:8080/h2-console");
        System.out.println("=================================================");
    }
}
