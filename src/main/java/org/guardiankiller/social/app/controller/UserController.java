package org.guardiankiller.social.app.controller;

import org.guardiankiller.social.app.dto.UserCreateDTO;
import org.guardiankiller.social.app.dto.UserEditDTO;
import org.guardiankiller.social.app.dto.UserFullDTO;
import org.guardiankiller.social.app.dto.UserResultDTO;
import org.guardiankiller.social.app.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<String> postUser(@RequestBody UserCreateDTO userCreateDTO) {
        userService.register(userCreateDTO);
        return new ResponseEntity<>("Registration successful", HttpStatus.CREATED);
    }

    @GetMapping
    public List<UserResultDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("{usernameId}")
    public ResponseEntity<UserFullDTO> getUserByUsername(@PathVariable("usernameId") String usernameId) {
        return ResponseEntity.of(userService.getUserByUsername(usernameId));
    }

    @DeleteMapping("{usernameId}")
    public ResponseEntity<Void> deleteUserByUsername(@PathVariable("usernameId") String usernameId) {
        userService.deleteUserByUsername(usernameId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PatchMapping("{usernameId}")
    public ResponseEntity<String> patchUser(@PathVariable("usernameId") String usernameId, UserEditDTO userEditDTO) {
        userService.editUserInfo(usernameId, userEditDTO);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
