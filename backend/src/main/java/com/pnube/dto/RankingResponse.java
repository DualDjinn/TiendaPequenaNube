package com.pnube.dto;

import java.util.List;

public class RankingResponse {
    private List<RankingItem> topProductos;
    private List<EvolucionMensual> evolucion;

    public RankingResponse(List<RankingItem> topProductos, List<EvolucionMensual> evolucion) {
        this.topProductos = topProductos;
        this.evolucion = evolucion;
    }

    public List<RankingItem> getTopProductos() { return topProductos; }
    public List<EvolucionMensual> getEvolucion() { return evolucion; }

    public static class RankingItem {
        private Long productId;
        private String productName;
        private Long cantidadVendida;

        public RankingItem(Long productId, String productName, Long cantidadVendida) {
            this.productId = productId;
            this.productName = productName;
            this.cantidadVendida = cantidadVendida;
        }

        public Long getProductId() { return productId; }
        public String getProductName() { return productName; }
        public Long getCantidadVendida() { return cantidadVendida; }
    }

    public static class EvolucionMensual {
        private int mes;
        private int anio;
        private Double total;

        public EvolucionMensual(int mes, int anio, Double total) {
            this.mes = mes;
            this.anio = anio;
            this.total = total;
        }

        public int getMes() { return mes; }
        public int getAnio() { return anio; }
        public Double getTotal() { return total; }
    }
}
