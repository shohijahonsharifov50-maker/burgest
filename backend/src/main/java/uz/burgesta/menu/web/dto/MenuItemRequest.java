package uz.burgesta.menu.web.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import uz.burgesta.menu.domain.ItemTag;

public record MenuItemRequest(
        @NotNull Long categoryId,
        @NotNull @Valid LocalizedTextDto name,
        @NotNull @PositiveOrZero @Max(100_000_000) Long price,
        @Positive @Max(10_000) Integer weightGrams,
        ItemTag tag,
        Boolean available,
        @Min(0) Integer sortOrder) {
}
