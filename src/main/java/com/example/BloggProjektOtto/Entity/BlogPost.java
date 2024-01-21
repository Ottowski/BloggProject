package com.example.BloggProjektOtto.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "blog_post")
public class BlogPost {
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Column(name = "body_text",length = 10000) // Adjust length based on your requirements
    private String bodyText;
    @Getter
    @Column(name = "title")
    private String title;
    @Setter
    @Getter
    @Column(name = "date")
    private LocalDateTime date;
    @Setter
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity createdBy;

    public Object getCreatedBy() {
        return createdBy;
    }
}