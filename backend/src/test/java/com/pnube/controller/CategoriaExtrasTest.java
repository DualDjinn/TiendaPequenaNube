package com.pnube.controller;

import com.pnube.config.GlobalExceptionHandler;
import com.pnube.service.CategoriaService;
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
class CategoriaExtrasTest {

    @Mock private CategoriaService categoriaService;
    @InjectMocks private CategoriaController controller;
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller)
            .setControllerAdvice(new GlobalExceptionHandler())
            .build();
    }

    @Test
    void update_shouldReturn200() throws Exception {
        when(categoriaService.update(1L, "New")).thenReturn(new com.pnube.entity.Categoria());
        mockMvc.perform(put("/api/categorias/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nombre\":\"New\"}"))
            .andExpect(status().isOk());
    }

    @Test
    void update_shouldReturn404() throws Exception {
        when(categoriaService.update(99L, "New")).thenThrow(new RuntimeException("not found"));
        mockMvc.perform(put("/api/categorias/99")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nombre\":\"New\"}"))
            .andExpect(status().isNotFound());
    }

    @Test
    void create_shouldHandleError() throws Exception {
        when(categoriaService.create(any(), any())).thenThrow(new RuntimeException("error"));
        mockMvc.perform(post("/api/categorias")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nombre\":\"T\",\"lineaId\":1}"))
            .andExpect(status().isBadRequest());
    }
}
