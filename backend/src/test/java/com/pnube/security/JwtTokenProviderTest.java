package com.pnube.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class JwtTokenProviderTest {

    private JwtTokenProvider tokenProvider;

    @BeforeEach
    void setUp() {
        tokenProvider = new JwtTokenProvider(
            "c2e16a8f3d0b7c4e9a1d5f8b2c7e4a9d1f6b3c8e0a7d4f9b2c5e8a1d7f4b0c3",
            3600000L
        );
    }

    @Test
    void generateToken_shouldReturnValidToken() {
        String token = tokenProvider.generateToken("admin");
        assertNotNull(token);
        assertTrue(token.split("\\.").length == 3);
    }

    @Test
    void getUsernameFromToken_shouldReturnCorrectUsername() {
        String token = tokenProvider.generateToken("admin");
        assertEquals("admin", tokenProvider.getUsernameFromToken(token));
    }

    @Test
    void validateToken_shouldReturnTrueForValidToken() {
        String token = tokenProvider.generateToken("admin");
        assertTrue(tokenProvider.validateToken(token));
    }

    @Test
    void validateToken_shouldReturnFalseForExpiredToken() throws Exception {
        JwtTokenProvider shortLived = new JwtTokenProvider(
            "c2e16a8f3d0b7c4e9a1d5f8b2c7e4a9d1f6b3c8e0a7d4f9b2c5e8a1d7f4b0c3",
            -1L
        );
        String token = shortLived.generateToken("admin");
        Thread.sleep(10);
        assertFalse(shortLived.validateToken(token));
    }

    @Test
    void validateToken_shouldReturnFalseForInvalidToken() {
        assertFalse(tokenProvider.validateToken("invalid.jwt.token"));
    }

    @Test
    void validateToken_shouldReturnFalseForNull() {
        assertFalse(tokenProvider.validateToken(null));
    }

    @Test
    void constructor_shouldThrowWhenSecretIsNull() {
        assertThrows(IllegalStateException.class, () ->
            new JwtTokenProvider(null, 3600000L));
    }

    @Test
    void constructor_shouldThrowWhenSecretIsBlank() {
        assertThrows(IllegalStateException.class, () ->
            new JwtTokenProvider("", 3600000L));
    }
}
