package com.pnube.service;

import com.pnube.dto.CheckoutResponse;
import com.pnube.entity.Venta;
import com.pnube.entity.DetalleVenta;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.resources.preference.Preference;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.exceptions.MPApiException;
import jakarta.annotation.PostConstruct;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MercadoPagoService {

    @Value("${mercadopago.access-token}")
    private String accessToken;

    @Value("${mercadopago.success-url}")
    private String successUrl;

    @Value("${mercadopago.failure-url}")
    private String failureUrl;

    @Value("${mercadopago.pending-url}")
    private String pendingUrl;

    private static final Logger log = LoggerFactory.getLogger(MercadoPagoService.class);

    @PostConstruct
    public void init() {
        MercadoPagoConfig.setAccessToken(accessToken);
    }

    public CheckoutResponse crearPreferencia(Venta venta) {
        try {
        List<PreferenceItemRequest> items = venta.getDetalles().stream().map(dv ->
                PreferenceItemRequest.builder()
                        .id(dv.getProducto().getId().toString())
                        .title(dv.getProducto().getName())
                        .quantity(dv.getCantidad())
                        .unitPrice(BigDecimal.valueOf(dv.getPrecioUnitario()))
                        .currencyId("ARS")
                        .build()
        ).collect(Collectors.toList());

        PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
                .success(successUrl)
                .failure(failureUrl)
                .pending(pendingUrl)
                .build();

        PreferenceRequest request = PreferenceRequest.builder()
                .items(items)
                .externalReference(venta.getId().toString())
                .backUrls(backUrls)
                .build();

        PreferenceClient client = new PreferenceClient();
        Preference preference = client.create(request);
        return new CheckoutResponse(preference.getId(), preference.getInitPoint());
        } catch (MPApiException e) {
            log.error("MP API error - status: {}, response: {}", e.getStatusCode(), e.getApiResponse().getContent());
            throw new RuntimeException("Error al crear preferencia MP: " + e.getMessage());
        } catch (MPException e) {
            log.error("MP error: {}", e.getMessage());
            throw new RuntimeException("Error al crear preferencia MP: " + e.getMessage());
        }
    }

    public PaymentInfo consultarPago(Long paymentId) {
        try {
        PaymentClient client = new PaymentClient();
        var payment = client.get(paymentId);
        return new PaymentInfo(payment.getExternalReference(), payment.getStatus());
        } catch (MPApiException e) {
            log.error("MP API error - status: {}, response: {}", e.getStatusCode(), e.getApiResponse().getContent());
            throw new RuntimeException("Error al consultar pago MP: " + e.getMessage());
        } catch (MPException e) {
            log.error("MP error: {}", e.getMessage());
            throw new RuntimeException("Error al consultar pago MP: " + e.getMessage());
        }
    }

    public static class PaymentInfo {
        private String preferenceId;
        private String status;

        public PaymentInfo(String preferenceId, String status) {
            this.preferenceId = preferenceId;
            this.status = status;
        }

        public String getPreferenceId() { return preferenceId; }
        public String getStatus() { return status; }
    }
}
