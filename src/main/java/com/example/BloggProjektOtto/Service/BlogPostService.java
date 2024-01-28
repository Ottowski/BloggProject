package com.example.BloggProjektOtto.Service;
import com.example.BloggProjektOtto.Entity.BlogPost;
import com.example.BloggProjektOtto.Repository.BlogPostRepository;
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
    public BlogPost createBlogPost(BlogPost blogPost) {
        blogPost.setDate(LocalDateTime.now());
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