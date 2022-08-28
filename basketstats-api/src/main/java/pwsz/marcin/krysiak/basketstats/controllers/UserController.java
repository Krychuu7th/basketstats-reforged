package pwsz.marcin.krysiak.basketstats.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import pwsz.marcin.krysiak.basketstats.exceptions.UserNotFoundException;
import pwsz.marcin.krysiak.basketstats.models.User;
import pwsz.marcin.krysiak.basketstats.service.UserService;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;


@RequestMapping("/api")
@RestController
@CrossOrigin
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired
    UserService userService;

    @GetMapping("/user/list")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @GetMapping("/user/activeList")
    public ResponseEntity<List<User>> getAllActiveUsers() {
        return ResponseEntity.ok().body(userService.getAllActiveUsers());
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) throws UserNotFoundException {
        User user = userService.getUserByUsername(username)
                .orElseThrow(UserNotFoundException::new);

        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/userByEmail/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) throws UserNotFoundException {
        User user = userService.getUserByEmail(email)
                .orElseThrow(UserNotFoundException::new);

        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/user/isUserWithUsernameExisting/{username}")
    public boolean isUserWithUsernameExisting(@PathVariable String username) throws UserNotFoundException {
        try {
            User user = userService.getUserByUsername(username)
                    .orElseThrow(UserNotFoundException::new);
        } catch (UserNotFoundException e) {
            return false;
        }
        return true;
    }

    @GetMapping("/user/isUserWithEmailExisting/{email}")
    public boolean isUserWithEmailExisting(@PathVariable String email) throws UserNotFoundException {
        try {
            User user = userService.getUserByEmail(email)
                    .orElseThrow(UserNotFoundException::new);
        } catch (UserNotFoundException e) {
            return false;
        }
        return true;
    }

    @PostMapping("/user/create")
    public Object createUser(@Valid @RequestBody User user) {
        userService.createUser(user);
        return true;
    }

    @PutMapping("/user/update/{id}")
    public Object updateUser(@Valid @RequestBody User user, @PathVariable Long id) {

        userService.updateUser(user, id);
        return true;
    }

    @DeleteMapping("/user/delete/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id) {

        try {
            userService.deleteUserById(id);
            return ResponseEntity.noContent().build();
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/active/{id}")
    public ResponseEntity<Void> activateUser(@PathVariable Long id) throws Exception {

        userService.activeUser(id);
        return ResponseEntity.noContent().build();
    }
}
