package com.example.BloggProjektOtto.Entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class BlogPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 10000) // Adjust length based on your requirements
    private String bodyText;

    private LocalDateTime date;

    public void setDate(LocalDateTime now) {
    }

    // Constructors, getters, setters, etc.
}

