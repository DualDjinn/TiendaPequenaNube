package com.pnube.controller;

import com.pnube.config.GlobalExceptionHandler;
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
class MercadoPagoExtrasTest {

    @Mock private VentaService ventaService;
    @InjectMocks private MercadoPagoController controller;
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller)
            .setControllerAdvice(new GlobalExceptionHandler())
            .build();
    }

    @Test
    void confirm_shouldHandleError() throws Exception {
        doThrow(new RuntimeException("error")).when(ventaService).confirmarPagoPorPaymentId(any());
        mockMvc.perform(post("/api/mercadopago/confirm")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"paymentId\":\"999\"}"))
            .andExpect(status().isBadRequest());
    }
}
