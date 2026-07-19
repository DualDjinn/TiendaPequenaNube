package com.pnube.service;

import com.pnube.entity.Linea;
import com.pnube.repository.CategoriaRepository;
import com.pnube.repository.LineaRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LineaServiceTest {

    @Mock private LineaRepository repository;
    @Mock private CategoriaRepository categoriaRepository;
    @InjectMocks private LineaService lineaService;

    @Test
    void findAll_shouldReturnAll() {
        when(repository.findAll()).thenReturn(List.of(new Linea()));
        assertEquals(1, lineaService.findAll().size());
    }

    @Test
    void findActivas_shouldReturnActive() {
        when(repository.findByActivoTrue()).thenReturn(List.of(new Linea()));
        assertEquals(1, lineaService.findActivas().size());
    }

    @Test
    void findById_shouldThrowWhenNotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> lineaService.findById(99L));
    }

    @Test
    void create_shouldReturnSaved() {
        Linea l = new Linea(); l.setNombre("Test");
        when(repository.save(l)).thenReturn(l);
        assertNotNull(lineaService.create(l));
        verify(repository).save(l);
    }

    @Test
    void update_shouldModifyName() {
        Linea existing = new Linea(); existing.setId(1L); existing.setNombre("Old");
        Linea update = new Linea(); update.setNombre("New");
        when(repository.findById(1L)).thenReturn(Optional.of(existing));
        when(repository.save(any())).thenReturn(existing);
        Linea result = lineaService.update(1L, update);
        assertEquals("New", result.getNombre());
    }

    @Test
    void delete_shouldThrowWhenHasActiveCategories() {
        when(repository.findById(1L)).thenReturn(Optional.of(new Linea()));
        when(categoriaRepository.existsByLineaIdAndActivoTrue(1L)).thenReturn(true);
        assertThrows(RuntimeException.class, () -> lineaService.delete(1L));
    }

    @Test
    void delete_shouldDeactivateWhenNoCategories() {
        Linea l = new Linea(); l.setId(1L); l.setActivo(true);
        when(repository.findById(1L)).thenReturn(Optional.of(l));
        when(categoriaRepository.existsByLineaIdAndActivoTrue(1L)).thenReturn(false);
        lineaService.delete(1L);
        assertFalse(l.getActivo());
        verify(repository).save(l);
    }
}
