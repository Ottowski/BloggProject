package com.example.BloggProjektOtto.Controller;

import com.example.BloggProjektOtto.Entity.BlogPost;
import com.example.BloggProjektOtto.Repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/blog-posts")
public class BlogPostController {

    @Autowired
    private BlogPostRepository blogPostRepository;

    @PostMapping("/create")
    public ResponseEntity<BlogPost> createBlogPost(@RequestBody BlogPost blogPost) {
        blogPost.setDate(LocalDateTime.now()); // Set the current date
        BlogPost createdPost = blogPostRepository.save(blogPost);
        return ResponseEntity.ok(createdPost);
    }

    @GetMapping("/all")
    public ResponseEntity<List<BlogPost>> getAllBlogPosts() {
        List<BlogPost> allPosts = blogPostRepository.findAll();
        return ResponseEntity.ok(allPosts);
    }
}

