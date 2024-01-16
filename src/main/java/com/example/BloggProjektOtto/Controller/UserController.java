package com.example.BloggProjektOtto.Controller;
import com.example.BloggProjektOtto.Config.SecurityConfig;
import com.example.BloggProjektOtto.DTO.RegisterDTO;
import com.example.BloggProjektOtto.DTO.UserDTO;
import com.example.BloggProjektOtto.Entity.UserEntity;
import com.example.BloggProjektOtto.JWT.JWTRequest;
import com.example.BloggProjektOtto.JWT.JWTResponse;
import com.example.BloggProjektOtto.Repository.UserRepository;
import com.example.BloggProjektOtto.Service.JWTService;
import com.example.BloggProjektOtto.Service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class UserController {
    // User repository for database operations.
    private final UserRepository userRepository;
    // Password encoder for secure password storage.
    private final PasswordEncoder passwordEncoder;
    // Logger for logging information.
    private final UserService userService;
    private final JWTService jwtTokenService;
    private static final Logger log = LoggerFactory.getLogger(SecurityConfig.class);
    // Constructor for UserController, injecting dependencies.
    public UserController(UserService userService, JWTService jwtTokenService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.jwtTokenService = jwtTokenService;
    }
    // Endpoint to get a list of registered users. http://localhost:8082/api/users
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        // Retrieve all users from the database
        List<UserEntity> users = userRepository.findAll();

        // Convert the list of AppUser entities to a list of UserDTOs
        List<UserDTO> userDTOs = users.stream()
                .map(user -> new UserDTO(user.getId(), user.getUsername(), user.getRoles()))
                .collect(Collectors.toList());

        // Return the list of UserDTOs in the response
        return ResponseEntity.ok(userDTOs);
    }
    // Endpoint for user register. http://localhost:8082/api/register {
    //  "username": "test@test.com",
    //  "password": "test"
    //}

    @PostMapping("/register")
    public ResponseEntity<UserEntity> createUserWithRole(@RequestBody RegisterDTO userRegistrationDTO) {
        UserEntity savedUser = userService.registerUser(userRegistrationDTO);
        // Issue a JWT token and include it in the response headers
        var token = jwtTokenService.issueToken(userRegistrationDTO.getUsername(), userRegistrationDTO.toString());

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, token)
                .body(savedUser);
    }

    // Endpoint for user login. http://localhost:8082/api/login {
    //  "username": "test@test.com",
    //  "password": "test"
    //}
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody JWTRequest JWTRequest) {
        JWTResponse response = userService.login(JWTRequest);
        System.out.println(response);
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, response.getJwt())
                .body(response);
    }
}