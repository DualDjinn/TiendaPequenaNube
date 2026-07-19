package com.pnube.service;

import com.pnube.entity.Categoria;
import com.pnube.entity.Product;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ServiceGapsTest {

    @Mock private com.pnube.repository.ProductRepository productRepository;
    @Mock private com.pnube.repository.CategoriaRepository categoriaRepository;
    @InjectMocks private ProductService productService;

    @Test
    void productService_create_withExistingId() {
        Product p = new Product(); p.setId(99L); p.setName("Test");
        Categoria cat = new Categoria(); cat.setId(1L);
        when(categoriaRepository.findById(1L)).thenReturn(Optional.of(cat));
        when(productRepository.save(any())).thenReturn(p);
        Product result = productService.create(p, 1L);
        assertNull(result.getId());
    }

    @Test
    void paymentInfo_getters() {
        MercadoPagoService.PaymentInfo info = new MercadoPagoService.PaymentInfo("pref", "approved");
        assertEquals("pref", info.getPreferenceId());
        assertEquals("approved", info.getStatus());
    }
}
