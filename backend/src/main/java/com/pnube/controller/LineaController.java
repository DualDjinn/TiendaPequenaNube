package com.pnube.controller;

import com.pnube.entity.Linea;
import com.pnube.service.LineaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lineas")
public class LineaController {

    private final LineaService service;

    public LineaController(LineaService service) { this.service = service; }

    @GetMapping
    public List<Linea> getAll() { return service.findAll(); }

    @PostMapping
    public ResponseEntity<Linea> create(@RequestBody Linea linea) {
        return ResponseEntity.ok(service.create(linea));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Linea> update(@PathVariable Long id, @RequestBody Linea linea) {
        try { return ResponseEntity.ok(service.update(id, linea)); }
        catch (RuntimeException e) { return ResponseEntity.notFound().build(); }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try { service.delete(id); return ResponseEntity.noContent().build(); }
        catch (RuntimeException e) { return ResponseEntity.badRequest().build(); }
    }
}
