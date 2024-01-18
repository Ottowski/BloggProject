package com.example.BloggProjektOtto.JWT;
import com.example.BloggProjektOtto.DTO.UserDTO;
import lombok.Data;
@Data
public class JWTResponse {
    private final String jwt;
    private final UserDTO user;
    public JWTResponse(String jwt, UserDTO user) {
        this.jwt = jwt;
        this.user = user;
    }
}