package com.pnube.config;

import com.pnube.entity.*;
import com.pnube.repository.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final LineaRepository lineaRepository;
    private final CategoriaRepository categoriaRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    public DataInitializer(UserRepository userRepository,
                           ProductRepository productRepository,
                           LineaRepository lineaRepository,
                           CategoriaRepository categoriaRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.lineaRepository = lineaRepository;
        this.categoriaRepository = categoriaRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            userRepository.save(new User(adminUsername, passwordEncoder.encode(adminPassword), "ADMIN"));
        }

        if (productRepository.count() > 0) return;

        Linea joyeria = lineaRepository.save(linea("Joyería"));
        Linea amigurumi = lineaRepository.save(linea("Amigurumi"));

        Map<String, Categoria> cats = new HashMap<>();
        cats.put("joyeria|Anillos", categoriaRepository.save(categoria("Anillos", joyeria)));
        cats.put("joyeria|Aros", categoriaRepository.save(categoria("Aros", joyeria)));
        cats.put("joyeria|Collares", categoriaRepository.save(categoria("Collares", joyeria)));
        cats.put("joyeria|Pulseras", categoriaRepository.save(categoria("Pulseras", joyeria)));
        cats.put("amigurumi|Animales", categoriaRepository.save(categoria("Animales", amigurumi)));
        cats.put("amigurumi|Personajes", categoriaRepository.save(categoria("Personajes", amigurumi)));
        cats.put("amigurumi|Llaveros", categoriaRepository.save(categoria("Llaveros", amigurumi)));
        cats.put("amigurumi|Decoracion", categoriaRepository.save(categoria("Decoración", amigurumi)));

        productRepository.save(product("Anillo Sol Elegance", "anillo-sol-elegance", 4500.0,
                "Anillo de fantasia con detalle solar en dorado champagne.", "jewelry", "Anillos",
                15, "Metal dorado", "Dorado", null, null,
                "https://placehold.co/600x600/f5f0eb/D4AF37?text=Anillo+Sol", cats));

        productRepository.save(product("Aros Luna Creciente", "aros-luna-creciente", 3800.0,
                "Aros colgantes con forma de luna creciente. Ligeros y elegantes.", "jewelry", "Aros",
                20, "Acero quirurgico", "Rosa palo", null, null,
                "https://placehold.co/600x600/f5f0eb/E8C4C4?text=Aros+Luna", cats));

        productRepository.save(product("Collar Perla del Alma", "collar-perla-del-alma", 6200.0,
                "Collar con dije de perla de fantasia en cadena fina dorada.", "jewelry", "Collares",
                10, "Metal dorado", "Blanco/Dorado", null, null,
                "https://placehold.co/600x600/f5f0eb/ffffff?text=Collar+Perla", cats));

        productRepository.save(product("Pulsera Tejida Destellos", "pulsera-tejida-destellos", 3200.0,
                "Pulsera tejida con hilos dorados y detalles brillantes.", "jewelry", "Pulseras",
                25, "Hilo encerado", "Dorado", null, null,
                "https://placehold.co/600x600/f5f0eb/D4AF37?text=Pulsera+Destellos", cats));

        productRepository.save(product("Anillo Flor de Loto", "anillo-flor-de-loto", 5100.0,
                "Anillo abierto con diseno de flor de loto.", "jewelry", "Anillos",
                12, "Metal plateado", "Plateado", null, null,
                "https://placehold.co/600x600/f5f0eb/2e2a27?text=Anillo+Loto", cats));

        productRepository.save(product("Aros Aro Clasico Dorado", "aros-aro-clasico-dorado", 2800.0,
                "Aros clasicos dorados tamano mediano.", "jewelry", "Aros",
                30, "Metal dorado", "Dorado", null, null,
                "https://placehold.co/600x600/f5f0eb/D4AF37?text=Aros+Clasicos", cats));

        productRepository.save(product("Collar Estrella Fugaz", "collar-estrella-fugaz", 5500.0,
                "Collar con dije de estrella fugaz en rosado.", "jewelry", "Collares",
                8, "Acero quirurgico", "Rosa palo", null, null,
                "https://placehold.co/600x600/f5f0eb/E8C4C4?text=Collar+Estrella", cats));

        productRepository.save(product("Pulsera Cadena Elegante", "pulsera-cadena-elegante", 3600.0,
                "Pulsera cadena con cierre de seguridad.", "jewelry", "Pulseras",
                18, "Metal plateado", "Plateado", null, null,
                "https://placehold.co/600x600/f5f0eb/ffffff?text=Pulsera+Cadena", cats));

        productRepository.save(product("Anillo Eterno Corazon", "anillo-eterno-corazon", 4800.0,
                "Anillo con detalle de corazon en oro rosa.", "jewelry", "Anillos",
                14, "Metal dorado", "Rosa palo", null, null,
                "https://placehold.co/600x600/f5f0eb/E8C4C4?text=Anillo+Corazon", cats));

        productRepository.save(product("Aros Geo Tendencia", "aros-geo-tendencia", 3400.0,
                "Aros geometricos modernos. Livianos y con diseno vanguardista.", "jewelry", "Aros",
                22, "Metal plateado", "Plateado", null, null,
                "https://placehold.co/600x600/f5f0eb/2e2a27?text=Aros+Geo", cats));

        productRepository.save(product("Collar Dije Pluma", "collar-dije-pluma", 4200.0,
                "Collar con dije de pluma en dorado.", "jewelry", "Collares",
                7, "Metal dorado", "Dorado", null, null,
                "https://placehold.co/600x600/f5f0eb/D4AF37?text=Collar+Pluma", cats));

        productRepository.save(product("Pulsera Nudo Infinito", "pulsera-nudo-infinito", 2900.0,
                "Pulsera ajustable con nudo infinito.", "jewelry", "Pulseras",
                35, "Hilo encerado", "Rosa palo", null, null,
                "https://placehold.co/600x600/f5f0eb/E8C4C4?text=Pulsera+Infinito", cats));

        productRepository.save(product("Conejito Tejido Algodon", "conejito-tejido-algodon", 4500.0,
                "Conejito tejido a crochet en algodon suave.", "amigurumi", "Animales",
                8, null, null, "Algodon", "15cm",
                "https://placehold.co/600x600/f5f0eb/E8C4C4?text=Conejito", cats));

        productRepository.save(product("Osito Abrazable", "osito-abrazable", 5200.0,
                "Osito de crochet con brazos abrazables.", "amigurumi", "Animales",
                5, null, null, "Algodon", "20cm",
                "https://placehold.co/600x600/f5f0eb/D4AF37?text=Osito", cats));

        productRepository.save(product("Gatito Dormilon", "gatito-dormilon", 4800.0,
                "Gatito tejido en posicion de sueno.", "amigurumi", "Animales",
                6, null, null, "Algodon", "15cm",
                "https://placehold.co/600x600/f5f0eb/2e2a27?text=Gatito", cats));

        productRepository.save(product("Muneca Princesa", "muneca-princesa", 6800.0,
                "Muneca princesa tejida a mano con vestido y accesorios.", "amigurumi", "Personajes",
                4, null, null, "Algodon", "25cm",
                "https://placehold.co/600x600/f5f0eb/E8C4C4?text=Princesa", cats));

        productRepository.save(product("Superheroe de Crochet", "superheroe-crochet", 5900.0,
                "Figura de superheroe tejida en crochet.", "amigurumi", "Personajes",
                3, null, null, "Acrilico", "20cm",
                "https://placehold.co/600x600/f5f0eb/D4AF37?text=Superheroe", cats));

        productRepository.save(product("Duende Navideno", "duende-navideno", 4200.0,
                "Duende navideno tejido a crochet.", "amigurumi", "Personajes",
                10, null, null, "Acrilico", "15cm",
                "https://placehold.co/600x600/f5f0eb/ffffff?text=Duende", cats));

        productRepository.save(product("Llavero Osito Panda", "llavero-osito-panda", 2200.0,
                "Llavero tejido con forma de osito panda.", "amigurumi", "Llaveros",
                15, null, null, "Algodon", "8cm",
                "https://placehold.co/600x600/f5f0eb/2e2a27?text=Llavero+Panda", cats));

        productRepository.save(product("Llavero Estrella", "llavero-estrella", 1800.0,
                "Llavero tejido en forma de estrella.", "amigurumi", "Llaveros",
                20, null, null, "Algodon", "7cm",
                "https://placehold.co/600x600/f5f0eb/D4AF37?text=Llavero+Estrella", cats));

        productRepository.save(product("Llavero Corazon Tejido", "llavero-corazon-tejido", 1500.0,
                "Llavero en forma de corazon tejido a crochet.", "amigurumi", "Llaveros",
                25, null, null, "Algodon", "6cm",
                "https://placehold.co/600x600/f5f0eb/E8C4C4?text=Llavero+Corazon", cats));

        productRepository.save(product("Maceta Suculenta Tejida", "maceta-suculenta-tejida", 3800.0,
                "Maceta decorativa tejida con suculenta de crochet.", "amigurumi", "Decoracion",
                7, null, null, "Algodon", "12cm",
                "https://placehold.co/600x600/f5f0eb/ffffff?text=Maceta+Suculenta", cats));

        productRepository.save(product("Guirnalda Banderines", "guirnalda-banderines", 3500.0,
                "Guirnalda tejida con banderines de colores.", "amigurumi", "Decoracion",
                4, null, null, "Acrilico", "120cm",
                "https://placehold.co/600x600/f5f0eb/E8C4C4?text=Guirnalda", cats));

        productRepository.save(product("Cojin Nube Tejido", "cojin-nube-tejido", 5500.0,
                "Cojin con forma de nube tejido a crochet.", "amigurumi", "Decoracion",
                6, null, null, "Algodon", "40cm",
                "https://placehold.co/600x600/f5f0eb/2e2a27?text=Cojin+Nube", cats));

        productRepository.save(product("Pollito pio", "pollito-pio", 3500.0,
                "El pollito pio enojado", "amigurumi", "Animales",
                2, null, null, "Lana", "5 cm",
                "https://res.cloudinary.com/pjhkswfc/image/upload/v1783990133/pnube/embztilgtq4rpzv2b9ms.jpg", cats));
    }

    private Linea linea(String nombre) {
        Linea l = new Linea();
        l.setNombre(nombre);
        return l;
    }

    private Categoria categoria(String nombre, Linea linea) {
        Categoria c = new Categoria();
        c.setNombre(nombre);
        c.setLinea(linea);
        return c;
    }

    private Product product(String name, String slug, double price, String description,
                            String productLine, String category, int stock,
                            String material, String color, String yarnType, String size,
                            String images, Map<String, Categoria> cats) {
        Product p = new Product();
        p.setName(name);
        p.setSlug(slug);
        p.setPrice(price);
        p.setDescription(description);
        p.setStock(stock);
        p.setMaterial(material);
        p.setColor(color);
        p.setYarnType(yarnType);
        p.setSize(size);
        p.setImages(images);
        p.setCreatedAt(LocalDate.now().minusDays(30));
        p.setCategoria(cats.get(productLine + "|" + category));
        p.setActivo(true);
        return p;
    }
}
