package uz.burgesta.menu.service;

import java.util.List;
import uz.burgesta.menu.domain.Category;
import uz.burgesta.menu.domain.LocalizedText;
import uz.burgesta.menu.domain.MenuItem;
import uz.burgesta.menu.web.dto.CategoryResponse;
import uz.burgesta.menu.web.dto.LocalizedTextDto;
import uz.burgesta.menu.web.dto.MenuCategoryResponse;
import uz.burgesta.menu.web.dto.MenuItemAdminResponse;
import uz.burgesta.menu.web.dto.MenuItemResponse;

/** Converts between entities and API records. Has no state, so all methods are static. */
final class MenuMapper {

    private MenuMapper() {
    }

    static LocalizedText toText(LocalizedTextDto dto) {
        return dto == null ? null : new LocalizedText(dto.uz().strip(), dto.ru().strip(), dto.en().strip());
    }

    static LocalizedTextDto toDto(LocalizedText text) {
        return text == null || text.getUz() == null ? null : new LocalizedTextDto(text.getUz(), text.getRu(), text.getEn());
    }

    static MenuCategoryResponse toMenuCategory(Category category, List<MenuItem> availableItems) {
        return new MenuCategoryResponse(
                category.getSlug(),
                toDto(category.getName()),
                toDto(category.getNote()),
                availableItems.stream().map(MenuMapper::toMenuItem).toList());
    }

    static MenuItemResponse toMenuItem(MenuItem item) {
        return new MenuItemResponse(item.getId(), toDto(item.getName()), item.getPrice(), item.getWeightGrams(), item.getTag());
    }

    static CategoryResponse toCategory(Category category, long itemCount) {
        return new CategoryResponse(category.getId(), category.getSlug(), toDto(category.getName()),
                toDto(category.getNote()), category.getSortOrder(), itemCount);
    }

    static MenuItemAdminResponse toAdminItem(MenuItem item) {
        Category category = item.getCategory();
        return new MenuItemAdminResponse(item.getId(), category.getId(), category.getSlug(), toDto(item.getName()),
                item.getPrice(), item.getWeightGrams(), item.getTag(), item.isAvailable(), item.getSortOrder(),
                item.getUpdatedAt());
    }
}
