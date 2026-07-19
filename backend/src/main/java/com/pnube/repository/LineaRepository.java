package com.pnube.repository;

import com.pnube.entity.Linea;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LineaRepository extends JpaRepository<Linea, Long> {
    List<Linea> findByActivoTrue();
}
