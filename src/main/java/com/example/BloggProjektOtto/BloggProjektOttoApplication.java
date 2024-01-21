package com.example.BloggProjektOtto;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
@SpringBootApplication
@ComponentScan(basePackages = "com.example.BloggProjektOtto")
public class BloggProjektOttoApplication {
	public static void main(String[] args) {
		SpringApplication.run(BloggProjektOttoApplication.class, args);
	}
}