package uz.burgesta.menu.web.dto;

public record CategoryResponse(
        Long id,
        String slug,
        LocalizedTextDto name,
        LocalizedTextDto note,
        int sortOrder,
        long itemCount) {
}
