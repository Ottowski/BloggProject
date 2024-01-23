import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const BlogPostsList = ({ blogPosts }) => {
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);

  const handleOpenBlogPost = (blogPost) => {
    setSelectedBlogPost(blogPost);
  };

  const handleCloseBlogPost = () => {
    setSelectedBlogPost(null);
  };

  return (
    <div>
      {Array.isArray(blogPosts) ? (
        blogPosts.map((post) => (
          <div key={post.id}>
            <h3 onClick={() => handleOpenBlogPost(post)} style={{ cursor: 'pointer' }}>
              {post.title}
            </h3>
            <p>{post.bodyText}</p>
            <p>Date: {post.date}, Username: {post.username}</p> {/* Updated label to "Username" */}
          </div>
        ))
      ) : (
        <p>Blog posts data is not an array.</p>
      )}

      <BlogPostPopup blogPost={selectedBlogPost} onClose={handleCloseBlogPost} />
    </div>
  );
};

const BlogPostPopup = ({ blogPost, onClose }) => {
  return (
    <Modal show={!!blogPost} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{blogPost?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{blogPost?.bodyText}</p>
        <p>Date: {blogPost?.date}, Username: {blogPost?.username}</p> {/* Updated label to "Username" */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BlogPostsList;
