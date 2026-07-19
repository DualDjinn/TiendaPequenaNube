package com.pnube.service;

import com.pnube.dto.CheckoutRequest;
import com.pnube.entity.*;
import com.pnube.repository.DetalleVentaRepository;
import com.pnube.repository.ProductRepository;
import com.pnube.repository.VentaRepository;
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
class VentaServiceTest {

    @Mock private VentaRepository ventaRepository;
    @Mock private DetalleVentaRepository detalleVentaRepository;
    @Mock private ProductRepository productRepository;
    @Mock private MercadoPagoService mpService;
    @InjectMocks private VentaService ventaService;

    @Test
    void crearCheckout_shouldThrowWhenProductNotFound() {
        CheckoutRequest req = new CheckoutRequest();
        req.setNombre("Test");
        req.setDireccion("Dir");
        req.setTelefono("123");
        CheckoutRequest.Item item = new CheckoutRequest.Item();
        item.setProductId(99L);
        item.setCantidad(1);
        req.setItems(List.of(item));

        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> ventaService.crearCheckout(req));
    }

    @Test
    void crearCheckout_shouldThrowWhenInsufficientStock() {
        CheckoutRequest req = new CheckoutRequest();
        req.setNombre("Test"); req.setDireccion("Dir"); req.setTelefono("123");
        CheckoutRequest.Item item = new CheckoutRequest.Item();
        item.setProductId(1L); item.setCantidad(10);
        req.setItems(List.of(item));

        Product p = new Product(); p.setId(1L); p.setStock(2); p.setPrice(100.0);
        when(productRepository.findById(1L)).thenReturn(Optional.of(p));

        assertThrows(RuntimeException.class, () -> ventaService.crearCheckout(req));
    }

    @Test
    void getVentasDelDia_shouldReturnList() {
        Venta v = new Venta(); v.setId(1L); v.setNombre("Test");
        v.setEstado(Venta.Estado.APROBADO); v.setMpPaymentId(123L);
        DetalleVenta dv = new DetalleVenta();
        dv.setCantidad(2); dv.setPrecioUnitario(100.0);
        v.setDetalles(List.of(dv));

        when(ventaRepository.findVentasDelDia(any(), any())).thenReturn(List.of(v));

        var result = ventaService.getVentasDelDia(19, 7, 2026);
        assertEquals(1, result.size());
        assertEquals(200.0, result.get(0).getTotal());
        assertEquals(2, result.get(0).getCantidadItems());
    }
}
