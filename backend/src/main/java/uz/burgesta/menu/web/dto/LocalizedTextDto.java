package uz.burgesta.menu.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LocalizedTextDto(
        @NotBlank @Size(max = 160) String uz,
        @NotBlank @Size(max = 160) String ru,
        @NotBlank @Size(max = 160) String en) {
}
