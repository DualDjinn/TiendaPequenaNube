package com.pnube.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "products")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private Double price;

    @Column(length = 3000)
    private String description;

    @Column(nullable = false)
    private Integer stock;

    private LocalDate createdAt;
    private Boolean isSale;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    @Column(nullable = false)
    private Boolean activo = true;

    private String material;
    private String color;
    private String yarnType;
    private String size;

    @Column(length = 3000)
    private String images;

    public Product() {}

    @Transient
    public Boolean getIsNew() {
        return createdAt != null && createdAt.isAfter(LocalDate.now().minusDays(7));
    }

    public void setIsNew(Boolean ignored) {}

    @Transient
    public String getProductLine() {
        if (categoria == null || categoria.getLinea() == null) return null;
        return categoria.getLinea().getNombre().toLowerCase();
    }

    @Transient
    public String getCategory() {
        if (categoria == null) return null;
        return categoria.getNombre();
    }

    @JsonProperty("categoriaId")
    public Long getCategoriaId() {
        return categoria != null ? categoria.getId() : null;
    }

    @JsonProperty("lineaId")
    public Long getLineaId() {
        return categoria != null && categoria.getLinea() != null ? categoria.getLinea().getId() : null;
    }

    public LocalDate getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDate createdAt) { this.createdAt = createdAt; }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
    public Boolean getIsSale() { return isSale; }
    public void setIsSale(Boolean isSale) { this.isSale = isSale; }
    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }
    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }
    public String getMaterial() { return material; }
    public void setMaterial(String material) { this.material = material; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public String getYarnType() { return yarnType; }
    public void setYarnType(String yarnType) { this.yarnType = yarnType; }
    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }
    public String getImages() { return images; }
    public void setImages(String images) { this.images = images; }
}
