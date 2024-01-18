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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class UserController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final JWTService jwtTokenService;
    private static final Logger log = LoggerFactory.getLogger(SecurityConfig.class);

    public UserController(UserService userService, JWTService jwtTokenService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.jwtTokenService = jwtTokenService;
    }

    // Endpoint to get a list of registered users. http://localhost:8082/api/users
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserEntity> users = userRepository.findAll();
        List<UserDTO> userDTOs = users.stream()
                .map(user -> new UserDTO(user.getId(), user.getUsername(), user.getRoles()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(userDTOs);
    }
    // Endpoint for user register. http://localhost:8082/api/register {
    //  "username": "test@test.com",
    //  "password": "test"
    //}

    @PostMapping("/register")
    public ResponseEntity<UserEntity> createUserWithRole(@RequestBody RegisterDTO userRegistrationDTO) {
        try {
            // Validate if the username is available before registering
            userService.validateUsernameAvailability(userRegistrationDTO.getUsername());

            // Register the user
            UserEntity savedUser = userService.registerUser(userRegistrationDTO);

            // Issue a JWT token and include it in the response headers
            var token = jwtTokenService.issueToken(userRegistrationDTO.getUsername(), userRegistrationDTO.toString());

            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, token)
                    .body(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(400).build(); // You might want to handle different HTTP status codes based on specific validation errors
        }
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