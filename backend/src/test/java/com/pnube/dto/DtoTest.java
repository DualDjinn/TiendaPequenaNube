package com.pnube.dto;

import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class DtoTest {

    @Test
    void loginRequest_shouldHaveGettersAndSetters() {
        LoginRequest r = new LoginRequest();
        r.setUsername("admin"); r.setPassword("pass");
        assertEquals("admin", r.getUsername()); assertEquals("pass", r.getPassword());
    }

    @Test
    void loginResponse_shouldHaveGetters() {
        LoginResponse r = new LoginResponse("token", "admin");
        assertEquals("token", r.getToken()); assertEquals("admin", r.getUsername());
    }

    @Test
    void checkoutResponse_shouldHaveGetters() {
        CheckoutResponse r = new CheckoutResponse("pref", "https://mp.com");
        assertEquals("pref", r.getPreferenceId()); assertEquals("https://mp.com", r.getInitPoint());
    }

    @Test
    void ventaDelDiaResponse_shouldHaveGetters() {
        VentaDelDiaResponse r = new VentaDelDiaResponse(1L, LocalDateTime.now(), "N", "D", "T", 1L, 200.0, 2);
        assertEquals(1L, r.getId()); assertEquals("N", r.getNombre());
        assertEquals(200.0, r.getTotal()); assertEquals(2, r.getCantidadItems());
    }

    @Test
    void rankingResponse_shouldHaveGetters() {
        RankingResponse.RankingItem item = new RankingResponse.RankingItem(1L, "P", 5L);
        RankingResponse.EvolucionMensual ev = new RankingResponse.EvolucionMensual(7, 2026, 1500.0);
        assertEquals("P", item.getProductName()); assertEquals(5L, item.getCantidadVendida());
        assertEquals(7, ev.getMes()); assertEquals(1500.0, ev.getTotal());
    }
}
