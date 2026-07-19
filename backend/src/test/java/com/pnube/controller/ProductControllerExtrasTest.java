package com.pnube.controller;

import com.pnube.entity.Product;
import com.pnube.service.ProductService;
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
class ProductControllerExtrasTest {

    @Mock private ProductService productService;
    @InjectMocks private ProductController controller;
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() { mockMvc = MockMvcBuilders.standaloneSetup(controller).build(); }

    @Test
    void create_shouldReturnProduct() throws Exception {
        when(productService.create(any(), any())).thenReturn(new Product());
        mockMvc.perform(post("/api/products")
                .param("categoriaId", "1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Test\"}"))
            .andExpect(status().isOk());
    }

    @Test
    void update_shouldReturnProduct() throws Exception {
        when(productService.update(any(), any(), any())).thenReturn(new Product());
        mockMvc.perform(put("/api/products/1")
                .param("categoriaId", "1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Updated\"}"))
            .andExpect(status().isOk());
    }

    @Test
    void softDelete_shouldReturn204() throws Exception {
        doNothing().when(productService).softDelete(1L);
        mockMvc.perform(delete("/api/products/1")).andExpect(status().isNoContent());
    }

    @Test
    void softDelete_shouldReturn404() throws Exception {
        doThrow(new RuntimeException("not found")).when(productService).softDelete(1L);
        mockMvc.perform(delete("/api/products/1")).andExpect(status().isNotFound());
    }
}
