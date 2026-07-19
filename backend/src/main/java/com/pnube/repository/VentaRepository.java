package com.pnube.repository;

import com.pnube.entity.Venta;
import com.pnube.entity.Venta.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface VentaRepository extends JpaRepository<Venta, Long> {

    Optional<Venta> findByMpPreferenceId(String mpPreferenceId);

    @Query("SELECT dv.producto.id, dv.producto.name, SUM(dv.cantidad) as total " +
           "FROM DetalleVenta dv " +
           "WHERE dv.venta.estado = 'APROBADO' " +
           "AND dv.venta.fecha BETWEEN :desde AND :hasta " +
           "GROUP BY dv.producto.id, dv.producto.name " +
           "ORDER BY total DESC")
    List<Object[]> findRanking(@Param("desde") LocalDateTime desde, @Param("hasta") LocalDateTime hasta);

    @Query("SELECT year(v.fecha), month(v.fecha), SUM(dv.cantidad * dv.precioUnitario) " +
           "FROM Venta v JOIN v.detalles dv " +
           "WHERE v.estado = 'APROBADO' " +
           "AND v.fecha BETWEEN :desde AND :hasta " +
           "GROUP BY year(v.fecha), month(v.fecha) " +
           "ORDER BY year(v.fecha), month(v.fecha)")
    List<Object[]> findEvolucionMensual(@Param("desde") LocalDateTime desde, @Param("hasta") LocalDateTime hasta);
}
