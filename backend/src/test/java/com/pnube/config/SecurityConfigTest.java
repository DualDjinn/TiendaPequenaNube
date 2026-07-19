package com.pnube.config;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

class SecurityConfigTest {

    private final SecurityConfig config = new SecurityConfig(null);

    @Test
    void passwordEncoder_shouldReturnBCrypt() {
        PasswordEncoder encoder = config.passwordEncoder();
        assertInstanceOf(BCryptPasswordEncoder.class, encoder);
        assertTrue(encoder.matches("password", encoder.encode("password")));
    }
}
