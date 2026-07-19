package com.pnube.dto;

import java.time.LocalDateTime;

public class VentaDelDiaResponse {
    private Long id;
    private LocalDateTime fecha;
    private String nombre;
    private String direccion;
    private String telefono;
    private Long mpPaymentId;
    private Double total;
    private Integer cantidadItems;

    public VentaDelDiaResponse(Long id, LocalDateTime fecha, String nombre, String direccion,
                                String telefono, Long mpPaymentId, Double total, Integer cantidadItems) {
        this.id = id;
        this.fecha = fecha;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.mpPaymentId = mpPaymentId;
        this.total = total;
        this.cantidadItems = cantidadItems;
    }

    public Long getId() { return id; }
    public LocalDateTime getFecha() { return fecha; }
    public String getNombre() { return nombre; }
    public String getDireccion() { return direccion; }
    public String getTelefono() { return telefono; }
    public Long getMpPaymentId() { return mpPaymentId; }
    public Double getTotal() { return total; }
    public Integer getCantidadItems() { return cantidadItems; }
}
