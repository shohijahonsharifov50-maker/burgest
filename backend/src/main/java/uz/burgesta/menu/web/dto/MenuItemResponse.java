package uz.burgesta.menu.web.dto;

import uz.burgesta.menu.domain.ItemTag;

/** A dish as shown on the public menu. */
public record MenuItemResponse(
        Long id,
        LocalizedTextDto name,
        long price,
        Integer weightGrams,
        ItemTag tag) {
}
