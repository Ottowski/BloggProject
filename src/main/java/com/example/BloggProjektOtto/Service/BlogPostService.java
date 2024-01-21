package com.example.BloggProjektOtto.Service;

import com.example.BloggProjektOtto.Config.AuthenticationFacade;
import com.example.BloggProjektOtto.Entity.BlogPost;
import com.example.BloggProjektOtto.Entity.UserEntity;
import com.example.BloggProjektOtto.Repository.BlogPostRepository;
import com.example.BloggProjektOtto.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BlogPostService {

    private static final Logger log = LoggerFactory.getLogger(BlogPostService.class);

    @Autowired
    private BlogPostRepository blogPostRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationFacade authenticationFacade;

    public BlogPost createBlogPost(BlogPost blogPost) {
        blogPost.setDate(LocalDateTime.now());

        // Set the user who created the post
        String currentUsername = authenticationFacade.getAuthentication().getName();
        log.debug("Current Username: {}", currentUsername);

        UserEntity currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("User not found for username: " + currentUsername));
        log.debug("Current User: {}", currentUser);

        blogPost.setCreatedBy(currentUser);

        // Additional log to check the details of the blog post being created
        log.debug("Creating Blog Post: Title={}, Body={}, Date={}, CreatedBy={}",
                blogPost.getTitle(), blogPost.getBodyText(), blogPost.getDate(), blogPost.getCreatedBy());

        return blogPostRepository.save(blogPost);
    }




    public List<BlogPost> getAllBlogPosts() {
        List<BlogPost> blogPosts = blogPostRepository.findAll();

        // Add the logging code here
        for (BlogPost post : blogPosts) {
            log.debug("Retrieved Blog Post: Title={}, Body={}, Date={}", post.getTitle(), post.getBodyText(), post.getDate());
        }

        return blogPostRepository.findAll();
    }
}