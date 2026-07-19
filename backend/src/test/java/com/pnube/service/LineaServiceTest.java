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
    void delete_shouldThrowWhenHasActiveCategories() {
        when(repository.findById(1L)).thenReturn(Optional.of(new Linea()));
        when(categoriaRepository.existsByLineaIdAndActivoTrue(1L)).thenReturn(true);
        assertThrows(RuntimeException.class, () -> lineaService.delete(1L));
    }
}
