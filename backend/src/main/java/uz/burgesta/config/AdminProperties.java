package uz.burgesta.config;

import jakarta.validation.constraints.NotBlank;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

/** Credentials of the single admin account that manages the menu. */
@Validated
@ConfigurationProperties(prefix = "burgesta.admin")
public record AdminProperties(@NotBlank String username, @NotBlank String password) {
}
