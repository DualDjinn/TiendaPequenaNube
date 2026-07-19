package com.pnube.service;

import com.pnube.dto.CheckoutRequest;
import com.pnube.dto.CheckoutResponse;
import com.pnube.dto.RankingResponse;
import com.pnube.entity.*;
import com.pnube.repository.DetalleVentaRepository;
import com.pnube.repository.ProductRepository;
import com.pnube.repository.VentaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VentaService {

    private static final Logger log = LoggerFactory.getLogger(VentaService.class);
    private final VentaRepository ventaRepository;
    private final DetalleVentaRepository detalleVentaRepository;
    private final ProductRepository productRepository;
    private final MercadoPagoService mpService;

    public VentaService(VentaRepository ventaRepository,
                        DetalleVentaRepository detalleVentaRepository,
                        ProductRepository productRepository,
                        MercadoPagoService mpService) {
        this.ventaRepository = ventaRepository;
        this.detalleVentaRepository = detalleVentaRepository;
        this.productRepository = productRepository;
        this.mpService = mpService;
    }

    @Transactional
    public CheckoutResponse crearCheckout(CheckoutRequest request) {
        Venta venta = new Venta();
        venta.setFecha(LocalDateTime.now());
        venta.setNombre(request.getNombre());
        venta.setDireccion(request.getDireccion());
        venta.setTelefono(request.getTelefono());
        venta.setEstado(Venta.Estado.PENDIENTE);
        venta = ventaRepository.save(venta);

        final Venta savedVenta = venta;

        List<DetalleVenta> detalles = request.getItems().stream().map(item -> {
            Product producto = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + item.getProductId()));
            if (producto.getStock() < item.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para: " + producto.getName());
            }
            DetalleVenta dv = new DetalleVenta();
            dv.setVenta(savedVenta);
            dv.setProducto(producto);
            dv.setCantidad(item.getCantidad());
            dv.setPrecioUnitario(producto.getPrice());
            return dv;
        }).collect(Collectors.toList());

        detalleVentaRepository.saveAll(detalles);
        venta.setDetalles(detalles);

        CheckoutResponse mpResponse = mpService.crearPreferencia(venta);
        venta.setMpPreferenceId(mpResponse.getPreferenceId());
        ventaRepository.save(venta);

        return mpResponse;
    }

    @Transactional
    public void confirmarPago(String topic, Long id) {
        if (!"payment".equals(topic)) return;
        var paymentInfo = mpService.consultarPago(id);
        Long ventaId = Long.valueOf(paymentInfo.getPreferenceId());
        log.info("Confirming payment for ventaId: {}", ventaId);
        Venta venta = ventaRepository.findById(ventaId)
                .orElseThrow(() -> new RuntimeException("Venta no encontrada: " + ventaId));

        if (venta.getEstado() != Venta.Estado.PENDIENTE) return;

        if ("approved".equals(paymentInfo.getStatus())) {
            venta.setEstado(Venta.Estado.APROBADO);
            venta.setMpPaymentId(id);
            venta.getDetalles().forEach(dv -> {
                Product p = dv.getProducto();
                p.setStock(p.getStock() - dv.getCantidad());
                productRepository.save(p);
            });
        } else if ("rejected".equals(paymentInfo.getStatus())) {
            venta.setEstado(Venta.Estado.RECHAZADO);
            venta.setMpPaymentId(id);
        } else if ("refunded".equals(paymentInfo.getStatus())) {
            venta.setEstado(Venta.Estado.REEMBOLSADO);
            venta.getDetalles().forEach(dv -> {
                Product p = dv.getProducto();
                p.setStock(p.getStock() + dv.getCantidad());
                productRepository.save(p);
            });
        }
        ventaRepository.save(venta);
    }

    @Transactional
    public void confirmarPagoPorPaymentId(Long paymentId) {
        var paymentInfo = mpService.consultarPago(paymentId);
        if (!"approved".equals(paymentInfo.getStatus())) return;

        Long ventaId = Long.valueOf(paymentInfo.getPreferenceId());
        log.info("Confirming payment by paymentId {} for ventaId: {}", paymentId, ventaId);
        Venta venta = ventaRepository.findById(ventaId)
                .orElseThrow(() -> new RuntimeException("Venta no encontrada: " + ventaId));

        if (venta.getEstado() != Venta.Estado.PENDIENTE) return;

        venta.setEstado(Venta.Estado.APROBADO);
        venta.setMpPaymentId(paymentId);
        venta.getDetalles().forEach(dv -> {
            Product p = dv.getProducto();
            p.setStock(p.getStock() - dv.getCantidad());
            productRepository.save(p);
        });
        ventaRepository.save(venta);
    }

    public RankingResponse getRanking(Integer mes, Integer anio) {
        LocalDateTime desde = LocalDateTime.of(anio, mes, 1, 0, 0);
        LocalDateTime hasta = desde.plusMonths(1);

        List<Object[]> rankingData = ventaRepository.findRanking(desde, hasta);
        List<RankingResponse.RankingItem> top = rankingData.stream()
                .map(r -> new RankingResponse.RankingItem((Long) r[0], (String) r[1], (Long) r[2]))
                .collect(Collectors.toList());

        LocalDateTime evolDesde = LocalDateTime.of(anio, 1, 1, 0, 0);
        LocalDateTime evolHasta = evolDesde.plusYears(1);
        List<Object[]> evolData = ventaRepository.findEvolucionMensual(evolDesde, evolHasta);
        List<RankingResponse.EvolucionMensual> evol = evolData.stream()
                .map(r -> new RankingResponse.EvolucionMensual((Integer) r[0], (Integer) r[1], (Double) r[2]))
                .collect(Collectors.toList());

        return new RankingResponse(top, evol);
    }
}
