package com.pnube.service;

import com.pnube.entity.Categoria;
import com.pnube.entity.Product;
import com.pnube.repository.CategoriaRepository;
import com.pnube.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock private ProductRepository repository;
    @Mock private CategoriaRepository categoriaRepository;
    @InjectMocks private ProductService productService;

    @Test
    void findAll_shouldReturnActiveProducts() {
        Product p = new Product(); p.setActivo(true);
        when(repository.findByActivoTrue()).thenReturn(List.of(p));
        assertEquals(1, productService.findAll().size());
    }

    @Test
    void findById_shouldReturnProduct() {
        Product p = new Product(); p.setId(1L);
        when(repository.findById(1L)).thenReturn(Optional.of(p));
        assertNotNull(productService.findById(1L));
    }

    @Test
    void findById_shouldThrowWhenNotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> productService.findById(99L));
    }

    @Test
    void findBySlug_shouldReturnProduct() {
        Product p = new Product(); p.setSlug("test-product");
        when(repository.findBySlug("test-product")).thenReturn(Optional.of(p));
        assertNotNull(productService.findBySlug("test-product"));
    }

    @Test
    void create_shouldSaveProduct() {
        Categoria cat = new Categoria(); cat.setId(1L);
        Product p = new Product(); p.setName("Test");
        when(categoriaRepository.findById(1L)).thenReturn(Optional.of(cat));
        when(repository.save(any())).thenReturn(p);
        assertNotNull(productService.create(p, 1L));
        verify(repository).save(p);
    }

    @Test
    void softDelete_shouldDeactivateProduct() {
        Product p = new Product(); p.setActivo(true);
        when(repository.findById(1L)).thenReturn(Optional.of(p));
        productService.softDelete(1L);
        assertFalse(p.getActivo());
        verify(repository).save(p);
    }
}
