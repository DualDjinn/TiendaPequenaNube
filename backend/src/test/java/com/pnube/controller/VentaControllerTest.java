package com.pnube.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pnube.dto.CheckoutResponse;
import com.pnube.dto.RankingResponse;
import com.pnube.dto.VentaDelDiaResponse;
import com.pnube.service.VentaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class VentaControllerTest {

    @Mock private VentaService ventaService;
    @InjectMocks private VentaController controller;
    private MockMvc mockMvc;
    private final ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    void setUp() { mockMvc = MockMvcBuilders.standaloneSetup(controller).build(); }

    @Test
    void checkout_shouldReturn200() throws Exception {
        when(ventaService.crearCheckout(any())).thenReturn(new CheckoutResponse("pref", "https://mp.com"));
        mockMvc.perform(post("/api/ventas")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nombre\":\"T\",\"direccion\":\"D\",\"telefono\":\"1\",\"items\":[{\"productId\":1,\"cantidad\":1}]}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.preferenceId").value("pref"));
    }

    @Test
    void ranking_shouldReturnData() throws Exception {
        when(ventaService.getRanking(7, 2026)).thenReturn(new RankingResponse(List.of(), List.of()));
        mockMvc.perform(get("/api/admin/ventas/ranking").param("mes","7").param("anio","2026"))
            .andExpect(status().isOk());
    }

    @Test
    void ventasDelDia_shouldReturnList() throws Exception {
        when(ventaService.getVentasDelDia(any(), any(), any()))
            .thenReturn(List.of(new VentaDelDiaResponse(1L, LocalDateTime.now(), "T","D","1",1L,100.0,1)));
        mockMvc.perform(get("/api/admin/ventas/del-dia"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].nombre").value("T"));
    }
}
