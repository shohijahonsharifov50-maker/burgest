package uz.burgesta.menu.web;

import java.util.List;
import java.util.concurrent.TimeUnit;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.burgesta.menu.service.MenuQueryService;
import uz.burgesta.menu.web.dto.MenuCategoryResponse;

@RestController
@RequestMapping("/api/menu")
public class PublicMenuController {

    private final MenuQueryService menuQueryService;

    public PublicMenuController(MenuQueryService menuQueryService) {
        this.menuQueryService = menuQueryService;
    }

    @GetMapping
    public ResponseEntity<List<MenuCategoryResponse>> getMenu() {
        return ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(60, TimeUnit.SECONDS).cachePublic())
                .body(menuQueryService.getPublicMenu());
    }
}
