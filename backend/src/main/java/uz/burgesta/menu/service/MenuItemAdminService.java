package uz.burgesta.menu.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.burgesta.common.NotFoundException;
import uz.burgesta.menu.domain.Category;
import uz.burgesta.menu.domain.MenuItem;
import uz.burgesta.menu.repository.MenuItemRepository;
import uz.burgesta.menu.web.dto.MenuItemAdminResponse;
import uz.burgesta.menu.web.dto.MenuItemRequest;

@Service
public class MenuItemAdminService {

    private final MenuItemRepository items;
    private final CategoryAdminService categoryService;

    public MenuItemAdminService(MenuItemRepository items, CategoryAdminService categoryService) {
        this.items = items;
        this.categoryService = categoryService;
    }

    @Transactional(readOnly = true)
    public List<MenuItemAdminResponse> findAll(Long categoryId) {
        List<MenuItem> result = categoryId == null
                ? items.findAllInMenuOrder()
                : items.findByCategoryIdOrderBySortOrderAscIdAsc(categoryId);
        return result.stream().map(MenuMapper::toAdminItem).toList();
    }

    @Transactional
    public MenuItemAdminResponse create(MenuItemRequest request) {
        Category category = categoryService.getCategory(request.categoryId());
        int sortOrder = request.sortOrder() != null ? request.sortOrder() : items.findMaxSortOrder(category.getId()) + 1;
        MenuItem item = new MenuItem(category, MenuMapper.toText(request.name()), request.price(),
                request.weightGrams(), request.tag(), availableOrDefault(request, true), sortOrder);
        return MenuMapper.toAdminItem(items.saveAndFlush(item));
    }

    @Transactional
    public MenuItemAdminResponse update(Long id, MenuItemRequest request) {
        MenuItem item = getItem(id);
        Category category = categoryService.getCategory(request.categoryId());
        int sortOrder = request.sortOrder() != null ? request.sortOrder() : item.getSortOrder();
        item.update(category, MenuMapper.toText(request.name()), request.price(), request.weightGrams(),
                request.tag(), availableOrDefault(request, item.isAvailable()), sortOrder);
        return MenuMapper.toAdminItem(items.saveAndFlush(item));
    }

    @Transactional
    public MenuItemAdminResponse setAvailability(Long id, boolean available) {
        MenuItem item = getItem(id);
        item.setAvailable(available);
        return MenuMapper.toAdminItem(items.saveAndFlush(item));
    }

    @Transactional
    public void delete(Long id) {
        items.delete(getItem(id));
    }

    private MenuItem getItem(Long id) {
        return items.findById(id).orElseThrow(() -> new NotFoundException("Menu item", id));
    }

    private static boolean availableOrDefault(MenuItemRequest request, boolean fallback) {
        return request.available() != null ? request.available() : fallback;
    }
}
