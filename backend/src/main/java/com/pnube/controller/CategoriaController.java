package com.pnube.controller;

import com.pnube.entity.Categoria;
import com.pnube.service.CategoriaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    private final CategoriaService service;

    public CategoriaController(CategoriaService service) { this.service = service; }

    @GetMapping("/linea/{lineaId}")
    public List<Categoria> getByLinea(@PathVariable Long lineaId) {
        return service.findByLineaId(lineaId);
    }

    @PostMapping
    public ResponseEntity<Categoria> create(@RequestBody Map<String, Object> body) {
        Long lineaId = Long.valueOf(body.get("lineaId").toString());
        String nombre = (String) body.get("nombre");
        return ResponseEntity.ok(service.create(lineaId, nombre));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> update(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try { return ResponseEntity.ok(service.update(id, body.get("nombre"))); }
        catch (RuntimeException e) { return ResponseEntity.notFound().build(); }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try { service.delete(id); return ResponseEntity.noContent().build(); }
        catch (RuntimeException e) { return ResponseEntity.badRequest().build(); }
    }
}
