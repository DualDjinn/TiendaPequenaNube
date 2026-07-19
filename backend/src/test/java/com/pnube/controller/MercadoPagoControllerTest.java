package com.pnube.controller;

import com.pnube.service.VentaService;
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
class MercadoPagoControllerTest {

    @Mock private VentaService ventaService;
    @InjectMocks private MercadoPagoController controller;
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() { mockMvc = MockMvcBuilders.standaloneSetup(controller).build(); }

    @Test
    void webhook_shouldAcceptPayment() throws Exception {
        mockMvc.perform(post("/api/mercadopago/webhook")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"type\":\"payment\",\"data\":{\"id\":\"123\"}}"))
            .andExpect(status().isOk());
        verify(ventaService).confirmarPago("payment", 123L);
    }

    @Test
    void webhook_shouldReturn400WhenMissingType() throws Exception {
        mockMvc.perform(post("/api/mercadopago/webhook")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"data\":{\"id\":\"123\"}}"))
            .andExpect(status().isBadRequest());
    }

    @Test
    void confirm_shouldReturn200() throws Exception {
        mockMvc.perform(post("/api/mercadopago/confirm")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"paymentId\":\"123\"}"))
            .andExpect(status().isOk());
    }
}
