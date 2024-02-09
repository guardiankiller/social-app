package org.guardiankiller.social.app.controller;

import org.guardiankiller.social.app.dto.*;
import org.guardiankiller.social.app.model.VisibilityModifiers;
import org.guardiankiller.social.app.service.ImageService;
import org.guardiankiller.social.app.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    UserService userService;
    ImageService imageService;

    public UserController(UserService userService, ImageService imageService) {
        this.userService = userService;
        this.imageService = imageService;
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
    public ResponseEntity<String> patchUser(@PathVariable("usernameId") String usernameId,
                                            @RequestBody UserEditDTO userEditDTO) {
        userService.editUserInfo(usernameId, userEditDTO);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping(value = "{usernameId}/images", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public void uploadImage(
            @PathVariable String usernameId,
            @RequestParam MultipartFile images,
            @RequestParam VisibilityModifiers visibility,
            String comment,
            @RequestParam boolean profileImage) {
        imageService.uploadImage(usernameId, images, visibility, comment, profileImage);
    }

    @GetMapping("{usernameId}/images")
    public Page<ImageDTO> getImages(@PathVariable String usernameId,
                                    @RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int pageSize,
                                    @RequestParam boolean profileImage) {
        return imageService.getAllImages(usernameId, PageRequest.of(page, pageSize), profileImage);
    }

    @GetMapping("{usernameId}/images/{imageId}")
    public ResponseEntity<ImageDTO> getImageByUsernameAndId(@PathVariable String usernameId,
                                                            @PathVariable int imageId) {
        return ResponseEntity.of(imageService.getImage(usernameId, imageId));
    }

    @DeleteMapping("{usernameId}/images/{imageId}")
    public ResponseEntity<Void> deleteImageByUsernameAndId(@PathVariable String usernameId,
                                                           @PathVariable int imageId) {
        imageService.deleteImageByUsernameAndId(usernameId, imageId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PatchMapping("{usernameId}/images/{imageId}")
    public ResponseEntity<String> patchImageByUsernameAndId(@PathVariable String usernameId,
                                                            @PathVariable int imageId,
                                                            @RequestBody ImageEditDTO editDTO) {
        imageService.editImage(usernameId, imageId, editDTO);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
