import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Navbar, Container, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';


const BlogPostsList = ({ blogPosts }) => {
  return (
    <div>
      <h2>All Blog Posts</h2>
      {blogPosts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.bodyText}</p>
          <p>Date: {post.date}</p>
          {/* Additional styling and details as needed */}
        </div>
      ))}
    </div>
  );
};

const BlogPostForm = ({ onSubmit }) => {
  const [blogPostData, setBlogPostData] = useState({ title: '', bodyText: '' });

  const handleTitleChange = (e) => {
    setBlogPostData({ ...blogPostData, title: e.target.value });
  };

  const handleBodyTextChange = (e) => {
    setBlogPostData({ ...blogPostData, bodyText: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(blogPostData);
    setBlogPostData({ title: '', bodyText: '' }); // Clear the form after submission
  };

  return (
    <div>
      <h2>Create Blog Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="blogPostTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter the title" value={blogPostData.title} onChange={handleTitleChange} />
        </Form.Group>
        <Form.Group controlId="blogPostBodyText">
          <Form.Label>Body Text</Form.Label>
          <Form.Control as="textarea" rows={4} placeholder="Enter the body text" value={blogPostData.bodyText} onChange={handleBodyTextChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BlogPostsList;