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

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class ProductControllerTest {

    @Mock private ProductService productService;
    @InjectMocks private ProductController controller;
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() { mockMvc = MockMvcBuilders.standaloneSetup(controller).build(); }

    @Test
    void getAll_shouldReturnProducts() throws Exception {
        Product p = new Product(); p.setId(1L); p.setName("Test");
        when(productService.findAll()).thenReturn(List.of(p));
        mockMvc.perform(get("/api/products"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].name").value("Test"));
    }

    @Test
    void getBySlug_shouldReturnProduct() throws Exception {
        Product p = new Product(); p.setSlug("test");
        when(productService.findBySlug("test")).thenReturn(p);
        mockMvc.perform(get("/api/products/by-slug/test"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.slug").value("test"));
    }

    @Test
    void getBySlug_shouldReturn404() throws Exception {
        when(productService.findBySlug("x")).thenThrow(new RuntimeException("nf"));
        mockMvc.perform(get("/api/products/by-slug/x")).andExpect(status().isNotFound());
    }

    @Test
    void getById_shouldReturnProduct() throws Exception {
        Product p = new Product(); p.setId(1L);
        when(productService.findById(1L)).thenReturn(p);
        mockMvc.perform(get("/api/products/1")).andExpect(status().isOk());
    }
}
