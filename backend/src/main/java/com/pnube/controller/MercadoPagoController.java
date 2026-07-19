package com.pnube.controller;

import com.pnube.service.VentaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/mercadopago")
public class MercadoPagoController {

    private final VentaService ventaService;

    public MercadoPagoController(VentaService ventaService) { this.ventaService = ventaService; }

    @PostMapping({"/webhook", "/notifications"})
    public ResponseEntity<String> webhook(@RequestBody Map<String, Object> body) {
        String type = (String) body.get("type");
        if (type == null) type = (String) body.get("topic");
        Long id = body.get("data") != null
                ? Long.valueOf(((Map<String, Object>) body.get("data")).get("id").toString())
                : null;
        if (id != null) {
            ventaService.confirmarPago(type, id);
        }
        return ResponseEntity.ok("OK");
    }

    @PostMapping("/confirm")
    public ResponseEntity<String> confirm(@RequestBody Map<String, Object> body) {
        Long paymentId = Long.valueOf(body.get("paymentId").toString());
        try {
            ventaService.confirmarPagoPorPaymentId(paymentId);
            return ResponseEntity.ok("OK");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
