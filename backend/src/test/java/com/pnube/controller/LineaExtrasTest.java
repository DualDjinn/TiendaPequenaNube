package com.pnube.controller;

import com.pnube.config.GlobalExceptionHandler;
import com.pnube.entity.Linea;
import com.pnube.service.LineaService;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class LineaExtrasTest {

    @Mock private LineaService lineaService;
    @InjectMocks private LineaController controller;
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller)
            .setControllerAdvice(new GlobalExceptionHandler())
            .build();
    }

    @Test
    void update_shouldReturn200() throws Exception {
        when(lineaService.update(eq(1L), any())).thenReturn(new Linea());
        mockMvc.perform(put("/api/lineas/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nombre\":\"New\"}"))
            .andExpect(status().isOk());
    }

    @Test
    void update_shouldReturn404() throws Exception {
        when(lineaService.update(eq(99L), any())).thenThrow(new RuntimeException("not found"));
        mockMvc.perform(put("/api/lineas/99")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nombre\":\"New\"}"))
            .andExpect(status().isNotFound());
    }

    @Test
    void delete_shouldReturn400() throws Exception {
        doThrow(new RuntimeException("error")).when(lineaService).delete(99L);
        mockMvc.perform(delete("/api/lineas/99")).andExpect(status().isBadRequest());
    }
}
