package com.pnube.controller;

import com.pnube.service.VentaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/mercadopago")
public class MercadoPagoController {

    private static final Logger log = LoggerFactory.getLogger(MercadoPagoController.class);
    private final VentaService ventaService;

    public MercadoPagoController(VentaService ventaService) { this.ventaService = ventaService; }

    @PostMapping({"/webhook", "/notifications"})
    public ResponseEntity<String> webhook(@RequestBody Map<String, Object> body) {
        String type = (String) body.get("type");
        if (type == null) type = (String) body.get("topic");
        if (type == null) return ResponseEntity.badRequest().build();
        Long id = body.get("data") != null
                ? Long.valueOf(((Map<String, Object>) body.get("data")).get("id").toString())
                : null;
        if (id == null) return ResponseEntity.badRequest().build();
        log.info("MP webhook received - type: {}, id: {}", type, id);
        ventaService.confirmarPago(type, id);
        return ResponseEntity.ok("OK");
    }

    // ponytail: called from frontend success page, verifies with MP API before confirming
    @PostMapping("/confirm")
    public ResponseEntity<String> confirm(@RequestBody Map<String, Object> body) {
        Object raw = body.get("paymentId");
        if (raw == null) return ResponseEntity.badRequest().body("Missing paymentId");
        try {
            Long paymentId = Long.valueOf(raw.toString());
            ventaService.confirmarPagoPorPaymentId(paymentId);
            return ResponseEntity.ok("OK");
        } catch (RuntimeException e) {
            log.warn("Payment confirmation failed: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
