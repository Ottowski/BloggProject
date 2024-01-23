package com.example.BloggProjektOtto.Controller;

import com.example.BloggProjektOtto.DTO.BlogPostDTO;
import com.example.BloggProjektOtto.Entity.BlogPost;
import com.example.BloggProjektOtto.Repository.BlogPostRepository;
import com.example.BloggProjektOtto.Service.BlogPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/blog-posts")
public class BlogPostController {

    @Autowired
    private BlogPostService blogPostService;

    @PostMapping("/create")
    public ResponseEntity<BlogPost> createBlogPost(@RequestBody BlogPost blogPost) {
        BlogPost createdPost = blogPostService.createBlogPost(blogPost);
        return ResponseEntity.ok(createdPost);
    }

    @GetMapping("/all")
    public ResponseEntity<List<BlogPostDTO>> getAllBlogPosts() {
        List<BlogPost> blogPosts = blogPostService.getAllBlogPosts();
        List<BlogPostDTO> blogPostDTOs = mapToDTO(blogPosts); // Implement a mapping method
        return ResponseEntity.ok(blogPostDTOs);
    }

    private List<BlogPostDTO> mapToDTO(List<BlogPost> posts) {
        return posts.stream()
                .map(post -> {
                    BlogPostDTO postDTO = new BlogPostDTO();
                    postDTO.setId(post.getId());
                    postDTO.setTitle(post.getTitle());
                    postDTO.setBodyText(post.getBodyText());
                    postDTO.setDate(post.getDate());
                    postDTO.setUsername(post.getUsername());  // Set the username
                    return postDTO;
                })
                .collect(Collectors.toList());
    }

}