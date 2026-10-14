package uz.burgesta.menu.web;

import java.security.Principal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.burgesta.menu.web.dto.AdminProfileResponse;

/** Lets the admin panel check that the entered credentials are correct. */
@RestController
@RequestMapping("/api/admin")
public class AdminProfileController {

    @GetMapping("/me")
    public AdminProfileResponse me(Principal principal) {
        return new AdminProfileResponse(principal.getName());
    }
}
