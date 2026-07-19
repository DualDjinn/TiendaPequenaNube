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

import java.util.Collections;
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
        req.setNombre("Test"); req.setDireccion("Dir"); req.setTelefono("123");
        CheckoutRequest.Item item = new CheckoutRequest.Item();
        item.setProductId(99L); item.setCantidad(1);
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

    @Test
    void confirmarPago_shouldApproveAndUpdateStock() {
        MercadoPagoService.PaymentInfo info =
            new MercadoPagoService.PaymentInfo("1", "approved");
        when(mpService.consultarPago(123L)).thenReturn(info);
        Product p = new Product(); p.setId(1L); p.setStock(5);
        DetalleVenta dv = new DetalleVenta();
        dv.setCantidad(2); dv.setPrecioUnitario(100.0); dv.setProducto(p);
        Venta v = new Venta(); v.setId(1L); v.setEstado(Venta.Estado.PENDIENTE);
        v.setDetalles(List.of(dv));
        when(ventaRepository.findById(1L)).thenReturn(Optional.of(v));
        when(productRepository.save(any())).thenReturn(p);

        ventaService.confirmarPago("payment", 123L);
        assertEquals(Venta.Estado.APROBADO, v.getEstado());
        assertEquals(123L, v.getMpPaymentId());
        assertEquals(3, p.getStock());
        verify(ventaRepository).save(v);
    }

    @Test
    void confirmarPago_shouldReject() {
        MercadoPagoService.PaymentInfo info =
            new MercadoPagoService.PaymentInfo("1", "rejected");
        when(mpService.consultarPago(123L)).thenReturn(info);
        Venta v = new Venta(); v.setId(1L); v.setEstado(Venta.Estado.PENDIENTE);
        v.setDetalles(List.of());
        when(ventaRepository.findById(1L)).thenReturn(Optional.of(v));

        ventaService.confirmarPago("payment", 123L);
        assertEquals(Venta.Estado.RECHAZADO, v.getEstado());
    }

    @Test
    void getRanking_shouldReturnResponse() {
        List<Object[]> rankingData = Collections.singletonList(new Object[]{1L, "Producto A", 5L});
        List<Object[]> evolData = Collections.singletonList(new Object[]{7, 2026, 1500.0});
        when(ventaRepository.findRanking(any(), any())).thenReturn(rankingData);
        when(ventaRepository.findEvolucionMensual(any(), any())).thenReturn(evolData);

        var result = ventaService.getRanking(7, 2026);
        assertEquals(1, result.getTopProductos().size());
        assertEquals("Producto A", result.getTopProductos().get(0).getProductName());
        assertEquals(1, result.getEvolucion().size());
        assertEquals(1500.0, result.getEvolucion().get(0).getTotal());
    }
}
