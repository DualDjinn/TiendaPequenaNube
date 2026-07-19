package com.pnube.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pnube.dto.LoginRequest;
import com.pnube.dto.LoginResponse;
import com.pnube.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock private AuthService authService;
    @InjectMocks private AuthController controller;
    private MockMvc mockMvc;
    private final ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    void setUp() { mockMvc = MockMvcBuilders.standaloneSetup(controller).build(); }

    @Test
    void login_shouldReturn200() throws Exception {
        when(authService.login(any())).thenReturn(new LoginResponse("token", "admin"));
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"admin\",\"password\":\"pass\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.token").value("token"));
    }

    @Test
    void login_shouldReturn401() throws Exception {
        when(authService.login(any())).thenThrow(new RuntimeException("bad"));
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"admin\",\"password\":\"wrong\"}"))
            .andExpect(status().isUnauthorized());
    }
}
