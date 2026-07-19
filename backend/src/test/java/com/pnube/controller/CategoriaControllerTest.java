package com.pnube.controller;

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

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class CategoriaControllerTest {

    @Mock private CategoriaService categoriaService;
    @InjectMocks private CategoriaController controller;
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() { mockMvc = MockMvcBuilders.standaloneSetup(controller).build(); }

    @Test
    void getByLinea_shouldReturnList() throws Exception {
        when(categoriaService.findByLineaId(1L)).thenReturn(List.of());
        mockMvc.perform(get("/api/categorias/linea/1")).andExpect(status().isOk());
    }

    @Test
    void create_shouldReturn200() throws Exception {
        when(categoriaService.create(1L, "Test")).thenReturn(new com.pnube.entity.Categoria());
        mockMvc.perform(post("/api/categorias")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nombre\":\"Test\",\"lineaId\":1}"))
            .andExpect(status().isOk());
    }

    @Test
    void delete_shouldReturn204() throws Exception {
        doNothing().when(categoriaService).delete(1L);
        mockMvc.perform(delete("/api/categorias/1")).andExpect(status().isNoContent());
    }
}
