package com.pnube.service;

import com.pnube.entity.Linea;
import com.pnube.repository.CategoriaRepository;
import com.pnube.repository.LineaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LineaService {

    private final LineaRepository lineaRepository;
    private final CategoriaRepository categoriaRepository;

    public LineaService(LineaRepository lineaRepository, CategoriaRepository categoriaRepository) {
        this.lineaRepository = lineaRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<Linea> findAll() {
        return lineaRepository.findAll();
    }

    public List<Linea> findActivas() {
        return lineaRepository.findByActivoTrue();
    }

    public Linea findById(Long id) {
        return lineaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Linea no encontrada"));
    }

    public Linea create(Linea linea) {
        return lineaRepository.save(linea);
    }

    public Linea update(Long id, Linea updated) {
        Linea existing = findById(id);
        existing.setNombre(updated.getNombre());
        return lineaRepository.save(existing);
    }

    public void delete(Long id) {
        Linea linea = findById(id);
        if (categoriaRepository.existsByLineaIdAndActivoTrue(id)) {
            throw new RuntimeException("No se puede desactivar una línea con categorías activas");
        }
        linea.setActivo(false);
        lineaRepository.save(linea);
    }
}
