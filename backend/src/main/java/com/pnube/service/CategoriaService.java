package com.pnube.service;

import com.pnube.entity.Categoria;
import com.pnube.entity.Linea;
import com.pnube.repository.CategoriaRepository;
import com.pnube.repository.LineaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;
    private final LineaRepository lineaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository, LineaRepository lineaRepository) {
        this.categoriaRepository = categoriaRepository;
        this.lineaRepository = lineaRepository;
    }

    public List<Categoria> findByLineaId(Long lineaId) {
        return categoriaRepository.findByLineaIdOrderByNombre(lineaId);
    }

    public Categoria findById(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria no encontrada"));
    }

    public Categoria create(Long lineaId, String nombre) {
        Linea linea = lineaRepository.findById(lineaId)
                .orElseThrow(() -> new RuntimeException("Linea no encontrada"));
        Categoria categoria = new Categoria();
        categoria.setNombre(nombre);
        categoria.setLinea(linea);
        return categoriaRepository.save(categoria);
    }

    public Categoria update(Long id, String nombre) {
        Categoria existing = findById(id);
        existing.setNombre(nombre);
        return categoriaRepository.save(existing);
    }

    public void delete(Long id) {
        Categoria categoria = findById(id);
        categoria.setActivo(false);
        categoriaRepository.save(categoria);
    }
}
