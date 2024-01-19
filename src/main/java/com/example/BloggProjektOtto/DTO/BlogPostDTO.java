package com.example.BloggProjektOtto.DTO;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class BlogPostDTO {
    private Long id;
    private String title;
    private String bodyText;
    private LocalDateTime date;

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setBodyText(String bodyText) {
        this.bodyText = bodyText;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}