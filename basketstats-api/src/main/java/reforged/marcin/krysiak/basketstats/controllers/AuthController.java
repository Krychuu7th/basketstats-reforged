package reforged.marcin.krysiak.basketstats.controllers;


import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 * Auth testing controller
 */
@RestController
@RequestMapping("/api/messages")
public class AuthController {

    @GetMapping(value = "/public")
    public String publicEndpoint() {
        return "All good. You DO NOT need to be authenticated to call /api/public.";
    }

    @GetMapping(value = "/protected")
    public String privateEndpoint() {
        return "All good. You can see this because you are Authenticated.";
    }

    @GetMapping(value = "/admin")
    @PreAuthorize("hasAuthority('read:admin-messages')")
    public String privateScopedEndpoint() {
        return "All good. You can see this because you are Authenticated with a Token granted the 'read:admin-messages' scope";
    }
}
