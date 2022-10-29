package reforged.marcin.krysiak.basketstats.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reforged.marcin.krysiak.basketstats.models.Role;
import reforged.marcin.krysiak.basketstats.service.RoleService;

import java.util.List;

@RequestMapping("/api/role")
@RestController
@CrossOrigin
public class RoleController {

    @Autowired
    RoleService roleService;

    @GetMapping("/list")
    public ResponseEntity<List<Role>> getAllRoles() {

        return ResponseEntity.ok().body(roleService.getAllRoles());
    }
}
