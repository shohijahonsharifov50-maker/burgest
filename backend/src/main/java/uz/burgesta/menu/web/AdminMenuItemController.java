package uz.burgesta.menu.web;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import uz.burgesta.menu.service.MenuItemAdminService;
import uz.burgesta.menu.web.dto.AvailabilityRequest;
import uz.burgesta.menu.web.dto.MenuItemAdminResponse;
import uz.burgesta.menu.web.dto.MenuItemRequest;

@RestController
@RequestMapping("/api/admin/items")
public class AdminMenuItemController {

    private final MenuItemAdminService service;

    public AdminMenuItemController(MenuItemAdminService service) {
        this.service = service;
    }

    @GetMapping
    public List<MenuItemAdminResponse> findAll(@RequestParam(required = false) Long categoryId) {
        return service.findAll(categoryId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MenuItemAdminResponse create(@Valid @RequestBody MenuItemRequest request) {
        return service.create(request);
    }

    @PutMapping("/{id}")
    public MenuItemAdminResponse update(@PathVariable Long id, @Valid @RequestBody MenuItemRequest request) {
        return service.update(id, request);
    }

    @PatchMapping("/{id}/availability")
    public MenuItemAdminResponse setAvailability(@PathVariable Long id, @Valid @RequestBody AvailabilityRequest request) {
        return service.setAvailability(id, request.available());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
