package uz.burgesta.menu.web.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record CategoryRequest(
        @NotBlank
        @Pattern(regexp = "[a-z0-9]+(-[a-z0-9]+)*", message = "use lowercase letters, digits and hyphens")
        String slug,
        @NotNull @Valid LocalizedTextDto name,
        @Valid LocalizedTextDto note,
        @Min(0) Integer sortOrder) {
}
