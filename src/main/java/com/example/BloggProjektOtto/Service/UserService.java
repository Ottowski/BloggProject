package com.example.BloggProjektOtto.Service;

import com.example.BloggProjektOtto.DTO.RegisterDTO;
import com.example.BloggProjektOtto.Entity.UserEntity;
import com.example.BloggProjektOtto.JWT.JWTRequest;
import com.example.BloggProjektOtto.JWT.JWTResponse;
import com.example.BloggProjektOtto.DTO.UserDTO;
import com.example.BloggProjektOtto.Repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository,
                       AuthenticationManager authenticationManager, JWTService jwtService) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public UserEntity registerUser(RegisterDTO userDto) {
        UserEntity user = new UserEntity();
        user.setUsername(userDto.getUsername());
        user.setRoles(userDto.getRoles());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        return userRepository.save(user);
    }

    public Optional<UserEntity> loginUser(String username, String password) {
        Optional<UserEntity> user = userRepository.findByUsername(username);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public JWTResponse login(JWTRequest JWTRequest) {
        return getAuthenticationResponse(JWTRequest);
    }

    public void validateUsernameAvailability(String username) {
        // You can implement your validation logic here, for example:
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username is not available");
        }
    }

    private JWTResponse getAuthenticationResponse(JWTRequest JWTRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        JWTRequest.getUsername(),
                        JWTRequest.getPassword()
                )
        );
        UserEntity user = (UserEntity) authentication.getPrincipal();
        UserDTO userDto = new UserDTO();
        userDto.setUsername(user.getUsername());
        userDto.setRoles(user.getRoles());

        String jwt = jwtService.generateToken(userDto, userDto.getRoles());
        return new JWTResponse(jwt, userDto);
    }
}
