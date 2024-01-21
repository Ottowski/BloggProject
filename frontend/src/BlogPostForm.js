// BlogPostForm.js
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const BlogPostForm = ({ onSubmit, isLoggedIn, username }) => {
  const [blogPostData, setBlogPostData] = useState({ title: '', bodyText: '' });

  const handleTitleChange = (e) => {
    setBlogPostData({ ...blogPostData, title: e.target.value });
  };

  const handleBodyTextChange = (e) => {
    setBlogPostData({ ...blogPostData, bodyText: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...blogPostData, username: username });
    setBlogPostData({ title: '', bodyText: '' });
  };

  if (!isLoggedIn) {
    return (
      <div>
        <p>Please log in to create a blog post.</p>
      </div>
    );
  }

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
        <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BlogPostForm;
