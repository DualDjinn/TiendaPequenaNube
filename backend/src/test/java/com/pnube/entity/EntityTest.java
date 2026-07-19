package com.pnube.entity;

import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class EntityTest {

    @Test
    void venta_shouldHaveGettersAndSetters() {
        Venta v = new Venta();
        v.setId(1L); v.setNombre("Test"); v.setDireccion("Dir"); v.setTelefono("123");
        v.setFecha(LocalDateTime.now()); v.setEstado(Venta.Estado.APROBADO);
        v.setMpPreferenceId("pref-123"); v.setMpPaymentId(456L);
        assertEquals(1L, v.getId()); assertEquals("Test", v.getNombre());
        assertEquals("Dir", v.getDireccion()); assertEquals("123", v.getTelefono());
        assertEquals(Venta.Estado.APROBADO, v.getEstado());
        assertEquals("pref-123", v.getMpPreferenceId()); assertEquals(456L, v.getMpPaymentId());
    }

    @Test
    void detalleVenta_shouldHaveGettersAndSetters() {
        DetalleVenta dv = new DetalleVenta();
        dv.setId(1L); dv.setCantidad(3); dv.setPrecioUnitario(100.0);
        Product p = new Product(); dv.setProducto(p);
        Venta v = new Venta(); dv.setVenta(v);
        assertEquals(1L, dv.getId()); assertEquals(3, dv.getCantidad());
        assertEquals(100.0, dv.getPrecioUnitario()); assertNotNull(dv.getProducto());
        assertNotNull(dv.getVenta());
    }

    @Test
    void user_shouldHaveGettersAndSetters() {
        User u = new User("admin", "hash", "ADMIN");
        assertEquals("admin", u.getUsername()); assertEquals("hash", u.getPassword());
        assertEquals("ADMIN", u.getRole());
    }

    @Test
    void categoria_shouldHaveGettersAndSetters() {
        Categoria c = new Categoria();
        c.setId(1L); c.setNombre("Test"); c.setActivo(true);
        Linea l = new Linea(); c.setLinea(l);
        assertEquals(1L, c.getId()); assertEquals("Test", c.getNombre());
        assertTrue(c.getActivo()); assertNotNull(c.getLinea());
    }
}
