package com.example.BloggProjektOtto.Entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Table(name = "blog_post")
public class BlogPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "body_text",length = 10000) // Adjust length based on your requirements
    private String bodyText;
    @Column(name = "title")
    private String title;
    @Getter
    @Column(name = "date")
    private LocalDateTime date;

    public void setDate(LocalDateTime now) {
    }
    public Long getId() {
        return id;
    }
    public String getTitle() {
        return title;
    }
    public String getBodyText() {
        return bodyText;
    }
}