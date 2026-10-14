package uz.burgesta.menu.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.burgesta.common.ConflictException;
import uz.burgesta.common.NotFoundException;
import uz.burgesta.menu.domain.Category;
import uz.burgesta.menu.repository.CategoryRepository;
import uz.burgesta.menu.repository.MenuItemRepository;
import uz.burgesta.menu.web.dto.CategoryRequest;
import uz.burgesta.menu.web.dto.CategoryResponse;

@Service
public class CategoryAdminService {

    private final CategoryRepository categories;
    private final MenuItemRepository items;

    public CategoryAdminService(CategoryRepository categories, MenuItemRepository items) {
        this.categories = categories;
        this.items = items;
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> findAll() {
        Map<Long, Long> counts = items.countByCategory().stream()
                .collect(Collectors.toMap(row -> (Long) row[0], row -> (Long) row[1]));
        return categories.findAllByOrderBySortOrderAscIdAsc().stream()
                .map(category -> MenuMapper.toCategory(category, counts.getOrDefault(category.getId(), 0L)))
                .toList();
    }

    @Transactional
    public CategoryResponse create(CategoryRequest request) {
        if (categories.existsBySlug(request.slug())) {
            throw new ConflictException("A category with slug '%s' already exists.".formatted(request.slug()));
        }
        int sortOrder = request.sortOrder() != null ? request.sortOrder() : categories.findMaxSortOrder() + 1;
        Category category = new Category(request.slug(), MenuMapper.toText(request.name()),
                MenuMapper.toText(request.note()), sortOrder);
        return MenuMapper.toCategory(categories.save(category), 0);
    }

    @Transactional
    public CategoryResponse update(Long id, CategoryRequest request) {
        Category category = getCategory(id);
        if (categories.existsBySlugAndIdNot(request.slug(), id)) {
            throw new ConflictException("A category with slug '%s' already exists.".formatted(request.slug()));
        }
        int sortOrder = request.sortOrder() != null ? request.sortOrder() : category.getSortOrder();
        category.update(request.slug(), MenuMapper.toText(request.name()), MenuMapper.toText(request.note()), sortOrder);
        return MenuMapper.toCategory(category, category.getItems().size());
    }

    @Transactional
    public void delete(Long id) {
        Category category = getCategory(id);
        if (items.existsByCategoryId(id)) {
            throw new ConflictException("Move or delete the items in this category first.");
        }
        categories.delete(category);
    }

    Category getCategory(Long id) {
        return categories.findById(id).orElseThrow(() -> new NotFoundException("Category", id));
    }
}
