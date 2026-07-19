package com.pnube.service;

import com.pnube.entity.Categoria;
import com.pnube.entity.Product;
import com.pnube.repository.CategoriaRepository;
import com.pnube.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;
    private final CategoriaRepository categoriaRepository;

    public ProductService(ProductRepository repository, CategoriaRepository categoriaRepository) {
        this.repository = repository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<Product> findAll() {
        return repository.findByActivoTrue();
    }

    public Product findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    public Product findBySlug(String slug) {
        return repository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    public Product create(Product product, Long categoriaId) {
        if (product.getId() != null) product.setId(null);
        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoria no encontrada"));
        product.setCategoria(categoria);
        product.setCreatedAt(LocalDate.now());
        product.setActivo(true);
        return repository.save(product);
    }

    public Product update(Long id, Product updated, Long categoriaId) {
        Product existing = findById(id);
        existing.setName(updated.getName());
        existing.setSlug(updated.getSlug());
        existing.setPrice(updated.getPrice());
        existing.setDescription(updated.getDescription());
        existing.setStock(updated.getStock());
        existing.setIsSale(updated.getIsSale());
        existing.setMaterial(updated.getMaterial());
        existing.setColor(updated.getColor());
        existing.setYarnType(updated.getYarnType());
        existing.setSize(updated.getSize());
        existing.setImages(updated.getImages());
        if (categoriaId != null) {
            Categoria categoria = categoriaRepository.findById(categoriaId)
                    .orElseThrow(() -> new RuntimeException("Categoria no encontrada"));
            existing.setCategoria(categoria);
        }
        return repository.save(existing);
    }

    public void softDelete(Long id) {
        Product product = findById(id);
        product.setActivo(false);
        repository.save(product);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
