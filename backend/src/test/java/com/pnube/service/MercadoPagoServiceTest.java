package com.pnube.service;

import com.pnube.entity.DetalleVenta;
import com.pnube.entity.Product;
import com.pnube.entity.Venta;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class MercadoPagoServiceTest {

    private MercadoPagoService mpService;

    @BeforeEach
    void setUp() {
        mpService = new MercadoPagoService();
        ReflectionTestUtils.setField(mpService, "accessToken", "TEST-123");
        ReflectionTestUtils.setField(mpService, "successUrl", "http://localhost:4200/success");
        ReflectionTestUtils.setField(mpService, "failureUrl", "http://localhost:4200/failure");
        ReflectionTestUtils.setField(mpService, "pendingUrl", "http://localhost:4200/pending");
    }

    @Test
    void init_shouldSetAccessToken() {
        assertDoesNotThrow(() -> mpService.init());
    }

    @Test
    void crearPreferencia_shouldThrowWhenMpFails() {
        Venta v = new Venta(); v.setId(1L);
        DetalleVenta dv = new DetalleVenta();
        Product p = new Product(); p.setId(1L); p.setName("Test"); p.setPrice(100.0);
        dv.setProducto(p); dv.setCantidad(1); dv.setPrecioUnitario(100.0);
        v.setDetalles(List.of(dv));
        assertThrows(RuntimeException.class, () -> mpService.crearPreferencia(v));
    }

    @Test
    void consultarPago_shouldThrowWhenMpFails() {
        assertThrows(RuntimeException.class, () -> mpService.consultarPago(999L));
    }
}
