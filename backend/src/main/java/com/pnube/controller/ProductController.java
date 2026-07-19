package com.pnube.controller;

import com.pnube.entity.Product;
import com.pnube.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) { this.productService = productService; }

    @GetMapping
    public List<Product> getAll() { return productService.findAll(); }

    @GetMapping("/by-slug/{slug}")
    public ResponseEntity<Product> getBySlug(@PathVariable String slug) {
        try { return ResponseEntity.ok(productService.findBySlug(slug)); }
        catch (RuntimeException e) { return ResponseEntity.notFound().build(); }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        try { return ResponseEntity.ok(productService.findById(id)); }
        catch (RuntimeException e) { return ResponseEntity.notFound().build(); }
    }

    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product product, @RequestParam Long categoriaId) {
        return ResponseEntity.ok(productService.create(product, categoriaId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody Product product,
                                          @RequestParam(required = false) Long categoriaId) {
        try { return ResponseEntity.ok(productService.update(id, product, categoriaId)); }
        catch (RuntimeException e) { return ResponseEntity.notFound().build(); }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> softDelete(@PathVariable Long id) {
        try { productService.softDelete(id); return ResponseEntity.noContent().build(); }
        catch (RuntimeException e) { return ResponseEntity.notFound().build(); }
    }
}
