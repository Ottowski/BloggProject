package com.example.BloggProjektOtto.Repository;
import com.example.BloggProjektOtto.Entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
}