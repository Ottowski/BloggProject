// BlogPostsList.js
import React from 'react';

const BlogPostsList = ({ blogPosts }) => {
  return (
    <div>
      {Array.isArray(blogPosts) ? (
        blogPosts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.bodyText}</p>
            <p>Date: {post.date}, User: {post.username}</p>
          </div>
        ))
      ) : (
        <p>Blog posts data is not an array.</p>
      )}
    </div>
  );
};

export default BlogPostsList;
