package com.pnube.repository;

import com.pnube.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    List<Categoria> findByLineaIdOrderByNombre(Long lineaId);
    List<Categoria> findByLineaIdAndActivoTrue(Long lineaId);
    boolean existsByLineaIdAndActivoTrue(Long lineaId);
}
