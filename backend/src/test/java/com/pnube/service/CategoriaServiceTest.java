package com.pnube.service;

import com.pnube.entity.Categoria;
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
class CategoriaServiceTest {

    @Mock private CategoriaRepository repository;
    @Mock private LineaRepository lineaRepository;
    @InjectMocks private CategoriaService categoriaService;

    @Test
    void findByLineaId_shouldReturnCategories() {
        when(repository.findByLineaIdOrderByNombre(1L)).thenReturn(List.of(new Categoria()));
        assertEquals(1, categoriaService.findByLineaId(1L).size());
    }

    @Test
    void findById_shouldReturn() {
        Categoria c = new Categoria(); c.setId(1L);
        when(repository.findById(1L)).thenReturn(Optional.of(c));
        assertNotNull(categoriaService.findById(1L));
    }

    @Test
    void findById_shouldThrowWhenNotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> categoriaService.findById(99L));
    }

    @Test
    void create_shouldThrowWhenLineaNotFound() {
        when(lineaRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> categoriaService.create(99L, "Test"));
    }

    @Test
    void create_shouldSaveAndReturn() {
        Linea linea = new Linea(); linea.setId(1L);
        Categoria c = new Categoria(); c.setId(1L); c.setNombre("Test");
        when(lineaRepository.findById(1L)).thenReturn(Optional.of(linea));
        when(repository.save(any())).thenReturn(c);
        Categoria result = categoriaService.create(1L, "Test");
        assertNotNull(result);
        assertEquals("Test", result.getNombre());
    }

    @Test
    void update_shouldModify() {
        Categoria c = new Categoria(); c.setId(1L); c.setNombre("Old");
        when(repository.findById(1L)).thenReturn(Optional.of(c));
        when(repository.save(any())).thenReturn(c);
        Categoria result = categoriaService.update(1L, "New");
        assertEquals("New", result.getNombre());
    }

    @Test
    void delete_shouldDeactivate() {
        Categoria c = new Categoria(); c.setActivo(true);
        when(repository.findById(1L)).thenReturn(Optional.of(c));
        categoriaService.delete(1L);
        assertFalse(c.getActivo());
        verify(repository).save(c);
    }
}
