package com.pnube.controller;

import com.pnube.dto.CheckoutRequest;
import com.pnube.dto.CheckoutResponse;
import com.pnube.dto.RankingResponse;
import com.pnube.service.VentaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class VentaController {

    private final VentaService ventaService;

    public VentaController(VentaService ventaService) { this.ventaService = ventaService; }

    @PostMapping("/api/ventas")
    public ResponseEntity<?> checkout(@Valid @RequestBody CheckoutRequest request) {
        try {
            CheckoutResponse response = ventaService.crearCheckout(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/api/admin/ventas/ranking")
    public ResponseEntity<RankingResponse> ranking(
            @RequestParam(required = false) Integer mes,
            @RequestParam(required = false) Integer anio) {
        if (mes == null) mes = java.time.LocalDate.now().getMonthValue();
        if (anio == null) anio = java.time.LocalDate.now().getYear();
        return ResponseEntity.ok(ventaService.getRanking(mes, anio));
    }
}
