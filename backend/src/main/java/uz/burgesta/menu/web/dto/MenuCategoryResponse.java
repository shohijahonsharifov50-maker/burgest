package uz.burgesta.menu.web.dto;

import java.util.List;

/** One section of the public menu with its available items. */
public record MenuCategoryResponse(
        String slug,
        LocalizedTextDto name,
        LocalizedTextDto note,
        List<MenuItemResponse> items) {
}
