package com.example.BloggProjektOtto.DTO;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.Setter;
@Data
public class BlogPostDTO {
    @Setter
    private Long id;
    @Setter
    private String title;
    @Setter
    private String bodyText;
    @Setter
    private LocalDateTime date;
    private String username;
}