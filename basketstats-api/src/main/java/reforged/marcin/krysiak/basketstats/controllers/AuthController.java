package reforged.marcin.krysiak.basketstats.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reforged.marcin.krysiak.basketstats.models.JwtBlacklist;
import reforged.marcin.krysiak.basketstats.service.JwtBlacklistService;


@RequestMapping("/api")
@RestController
@CrossOrigin
public class AuthController {

    @Autowired
    private JwtBlacklistService jwtBlacklistService;


    @PostMapping("/auth/logout")
    public ResponseEntity<JwtBlacklist> logout(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok().body(this.jwtBlacklistService.addToBlacklist(token));
    }
}
