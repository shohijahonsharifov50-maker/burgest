package uz.burgesta.menu.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.burgesta.menu.domain.MenuItem;
import uz.burgesta.menu.repository.CategoryRepository;
import uz.burgesta.menu.web.dto.MenuCategoryResponse;

/** Builds the public menu: only available items, and no empty sections. */
@Service
public class MenuQueryService {

    private final CategoryRepository categories;

    public MenuQueryService(CategoryRepository categories) {
        this.categories = categories;
    }

    @Transactional(readOnly = true)
    public List<MenuCategoryResponse> getPublicMenu() {
        return categories.findAllWithItems().stream()
                .map(category -> {
                    List<MenuItem> available = category.getItems().stream().filter(MenuItem::isAvailable).toList();
                    return MenuMapper.toMenuCategory(category, available);
                })
                .filter(section -> !section.items().isEmpty())
                .toList();
    }
}
