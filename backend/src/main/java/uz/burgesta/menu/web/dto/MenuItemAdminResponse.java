package uz.burgesta.menu.web.dto;

import java.time.Instant;
import uz.burgesta.menu.domain.ItemTag;

/** A dish with every field the admin panel can edit. */
public record MenuItemAdminResponse(
        Long id,
        Long categoryId,
        String categorySlug,
        LocalizedTextDto name,
        long price,
        Integer weightGrams,
        ItemTag tag,
        boolean available,
        int sortOrder,
        Instant updatedAt) {
}
