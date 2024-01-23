import React, { useState, useEffect, useMemo } from 'react';
import { Button, Navbar, Container, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';
import BlogPostsList from './BlogPostsList';
import BlogPostForm from './BlogPostForm';
function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '', confirmPassword: '' });
  const [registrationConfirmation, setRegistrationConfirmation] = useState(null);
  const [loginConfirmation, setLoginConfirmation] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const handleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
    setLoginConfirmation(null);
  };
  const handleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
    setRegistrationConfirmation(null);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        username: loginData.username,
        password: loginData.password,
      });
      setLoggedIn(true);
      setLoginConfirmation('Login successful!');
    } catch (error) {
      console.error('Login Error:', error);
      setLoginConfirmation('Login failed. Please check your credentials.');
    }
  };
  const handleLogout = () => {
    setLoggedIn(false);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (registerData.password !== registerData.confirmPassword) {
        console.error('Passwords do not match');
        setRegistrationConfirmation('Registration failed. Passwords do not match.');
        return;
      }
      await axios.post('http://localhost:8080/api/register', {
        username: registerData.username,
        password: registerData.password,
        roles: ['ROLE_USER'],
      });
      setRegistrationConfirmation('Registration successful!');
    } catch (error) {
      console.error('Register Error:', error);
      setRegistrationConfirmation('Registration failed. Please try again.');
    }
  };
  const fetchAllBlogPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/blog-posts/all');
      console.log('Fetched Blog Posts:', response.data);
      setBlogPosts(response.data);
    } catch (error) {
      console.error('Error fetching Blog Posts:', error);
    }
  };
  const handleBlogPostSubmit = async (blogPostData) => {
    try {
      const postDataWithUsername = { ...blogPostData, username: loginData.username };
      const response = await axios.post('http://localhost:8080/api/blog-posts/create', postDataWithUsername);
      console.log('Blog Post created:', response.data);
      fetchAllBlogPosts();
    } catch (error) {
      console.error('Error creating Blog Post:', error);
    }
  };
  useEffect(() => {
    fetchAllBlogPosts();
  }, [isLoggedIn]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('latest');
  const sortBlogPosts = (posts, option) => {
    return option === 'latest'
      ? [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))
      : [...posts].sort((a, b) => new Date(a.date) - new Date(b.date));
  };
  const filteredAndSortedPosts = useMemo(() => {
    const filteredPosts = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.bodyText.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return sortBlogPosts(filteredPosts, sortOption);
  }, [blogPosts, searchQuery, sortOption]);
  useEffect(() => {
    fetchAllBlogPosts();
  }, [isLoggedIn, sortOption]);


  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
          <i className="fas fa-home" style={{ marginRight: '5px' }}></i>
            BlogHomePage
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {isLoggedIn ? (
              <Button variant="outline-light" onClick={handleLogout}>
              <i className="fa-solid fa-user" style={{ color: 'green', marginRight: '5px' }}></i>
                Logout
              </Button>
            ) : (
              <div>
                <Button variant="outline-light" onClick={handleLoginModal}>
                <i className="fa-regular fa-user" style={{ marginRight: '5px' }}></i>
                  Login
                </Button>
                <Button variant="outline-light" onClick={handleRegisterModal} style={{ marginLeft: '10px' }}>
                  Register
                </Button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <h1>Hello, welcome to my blog page!</h1>
        <div style={{ marginBottom: '20px' }}>
                <Form>
                  <Form.Group controlId="searchQuery">
                    <Form.Control
                      type="text"
                      placeholder="Search for blog posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="sortOption">
                    <Form.Label>Sort By:</Form.Label>
                    <Form.Control
                      as="select"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option value="latest">Latest</option>
                      <option value="oldest">Oldest</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              </div>
         <BlogPostForm onSubmit={handleBlogPostSubmit} isLoggedIn={isLoggedIn} username={loginData.username} />
        <BlogPostsList blogPosts={blogPosts, filteredAndSortedPosts} />
      </Container>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={handleLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="loginUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter your username" value={loginData.username} onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLoginModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Register Modal */}
      <Modal show={showRegisterModal} onHide={handleRegisterModal}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="registerUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter your username" value={registerData.username} onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="registerPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm your password" value={registerData.confirmPassword} onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })} />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
              Register
            </Button>
          </Form>

          {/* Display registration confirmation */}
          {registrationConfirmation && (
            <div style={{ marginTop: '10px', color: 'green' }}>
              {registrationConfirmation}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRegisterModal}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;