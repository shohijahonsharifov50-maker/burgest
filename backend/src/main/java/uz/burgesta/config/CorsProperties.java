package uz.burgesta.config;

import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;

/** Browser origins allowed to call the API (the React site and admin panel). */
@ConfigurationProperties(prefix = "burgesta.cors")
public record CorsProperties(List<String> allowedOrigins) {

    public CorsProperties {
        allowedOrigins = allowedOrigins == null ? List.of() : List.copyOf(allowedOrigins);
    }
}
