package com.pnube.service;

import com.pnube.dto.LoginRequest;
import com.pnube.entity.User;
import com.pnube.repository.UserRepository;
import com.pnube.security.JwtTokenProvider;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private JwtTokenProvider tokenProvider;
    @InjectMocks private AuthService authService;

    private LoginRequest req(String username, String password) {
        LoginRequest r = new LoginRequest();
        r.setUsername(username);
        r.setPassword(password);
        return r;
    }

    @Test
    void login_shouldReturnTokenForValidCredentials() {
        User user = new User("admin", "hashed", "ADMIN");
        when(userRepository.findByUsername("admin")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password", "hashed")).thenReturn(true);
        when(tokenProvider.generateToken("admin")).thenReturn("jwt-token");

        var response = authService.login(req("admin", "password"));

        assertNotNull(response);
        assertEquals("admin", response.getUsername());
        assertEquals("jwt-token", response.getToken());
    }

    @Test
    void login_shouldThrowForInvalidUsername() {
        when(userRepository.findByUsername("unknown")).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> authService.login(req("unknown", "pass")));
    }

    @Test
    void login_shouldThrowForInvalidPassword() {
        User user = new User("admin", "hashed", "ADMIN");
        when(userRepository.findByUsername("admin")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrong", "hashed")).thenReturn(false);
        assertThrows(RuntimeException.class, () -> authService.login(req("admin", "wrong")));
    }
}
