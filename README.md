# 📰 BloggProject

A complete backend REST API built with **Java Spring Boot** for managing users, registration, login, and authentication using **JWT tokens**.

> This project is perfect for learning or as a backend for a blogging platform. You can connect this to any frontend (like React or Vue).

---

## 🧠 What This Project Does

- Lets users **register** an account
- Lets users **log in** to get a JWT token
- Protects routes so only authenticated users can access them
- Provides **role-based access control** (e.g., admin-only routes)
- Stores user data in an in-memory database (H2) for easy testing

---

## 📦 Technologies Used

- Java 17
- Spring Boot 3
- Spring Security
- JWT (JSON Web Token)
- Maven
- H2 Database (in-memory)
- DTO Pattern

---

## 🖥️ Who Can Use This?

This project is for:

- Developers building a frontend that needs a backend auth API
- Students learning backend development
- Anyone who wants to explore JWT, Spring Security, or REST APIs

---

## 🚀 How to Use This Project

### 1. ✅ Install Prerequisites

Make sure the following are installed:

- Java 17+  
- Git  
- Maven (`mvn -v` should work in terminal)  
- An IDE (e.g., IntelliJ IDEA, Eclipse, VS Code)  
- Optional: Postman or REST Client for testing

---

### 2. 📁 Clone the Repository

```bash
git clone https://github.com/Ottowski/BloggProject.git
cd BloggProject
3. ⚙️ Application Configuration
In the project folder, open:

plaintext
src/main/resources/application.properties
This file already contains configuration for an in-memory H2 database, so you don't need to set up anything for local use.

Here’s what it looks like:

properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update

jwt.secret=YourSuperSecretKey
logging.level.org.springframework.security=DEBUG
You can change jwt.secret to anything long and secure.

4. ▶️ Run the Application
In your terminal:

bash
./mvnw spring-boot:run
Or click "Run" in your IDE.

The server will start at:

arduino
http://localhost:8080
🔗 API Endpoints

Method	Endpoint	Description	Auth Required
POST	/register	Register a new user	❌
POST	/login	Login and get JWT token	❌
GET	/api/user/me	Get current user details	✅
GET	/api/users	List all users (admin)	✅ (Admin)
🧪 Example API Requests
📌 1. Register a User
POST to /register with body:

JSON example for you to use: 
{
  "username": "john",
  "password": "secret123"
}
📌 2. Login and Get Token
POST to /login with same credentials.
Response will look like:

json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
📌 3. Use JWT Token
For all protected routes (like /api/user/me), add a header:

Authorization: Bearer YOUR_TOKEN

🧰 How to Test With Postman
Open Postman

POST to http://localhost:8080/register with JSON body

POST to http://localhost:8080/login, copy the token

GET http://localhost:8080/api/user/me
Add header:
Authorization: Bearer <your_token_here>

🌐 How to Connect from a Frontend
Any frontend can call this backend! Example (JavaScript/React):

JS example for you to use:

const token = "your-token-here";

fetch("http://localhost:8080/api/user/me", {
  headers: {
    Authorization: "Bearer " + token
  }
})
  .then(res => res.json())
  .then(data => console.log(data));
🛠️ Project Structure
mathematica

BloggProject
├── Config/
│   └── SecurityConfig.java
├── Controller/
│   └── UserController.java
├── DTO/
│   ├── RegisterDTO.java
│   └── UserDTO.java
├── Entity/
│   └── UserEntity.java
├── JWT/
│   ├── JWTRequest.java
│   └── JWTResponse.java
├── Repository/
│   └── UserRepository.java
├── Service/
│   ├── JWTService.java
│   ├── UserService.java
│   └── UserDetailsService.java
└── Application.java (main class)
🧱 Optional: Use PostgreSQL Instead of H2

Install PostgreSQL locally

Create a database (e.g., bloggdb)

In application.properties, replace with:

properties
Kopiera
Redigera
spring.datasource.url=jdbc:postgresql://localhost:5432/bloggdb
spring.datasource.username=your_db_user
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
Also add PostgreSQL driver to pom.xml:

xml
Kopiera
Redigera
<dependency>
  <groupId>org.postgresql</groupId>
  <artifactId>postgresql</artifactId>
  <version>42.6.0</version>
</dependency>
