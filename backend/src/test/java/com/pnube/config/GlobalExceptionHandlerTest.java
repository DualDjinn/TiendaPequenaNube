package com.pnube.config;

import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler handler = new GlobalExceptionHandler();

    @Test
    void handleNotFound_shouldReturn404() {
        ResponseEntity<Map<String, String>> res = handler.handleNotFound(
            new ResourceNotFoundException("Not found"));
        assertEquals(404, res.getStatusCode().value());
        assertEquals("Not found", res.getBody().get("error"));
    }

    @Test
    void handleRuntime_shouldReturn400() {
        ResponseEntity<Map<String, String>> res = handler.handleRuntime(
            new RuntimeException("Error"));
        assertEquals(400, res.getStatusCode().value());
        assertEquals("Error", res.getBody().get("error"));
    }
}
