package com.example.BloggProjektOtto.Repository;

import com.example.BloggProjektOtto.Entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    // Additional methods if needed
}