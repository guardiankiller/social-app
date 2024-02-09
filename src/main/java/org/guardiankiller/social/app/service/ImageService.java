package org.guardiankiller.social.app.service;

import org.guardiankiller.social.app.dto.ImageDTO;
import org.guardiankiller.social.app.dto.ImageEditDTO;
import org.guardiankiller.social.app.model.VisibilityModifiers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface ImageService {
    void uploadImage(String usernameId,
                     MultipartFile image,
                     VisibilityModifiers modifiers,
                     String comment, boolean profileImage);

    Optional<ImageDTO> getImage(String usernameId, int imageId);

    Page<ImageDTO> getAllImages(String usernameId, Pageable pageable, boolean profileImage);

    void deleteImageByUsernameAndId(String username, int id);

    void editImage(String usernameId, int imageId, ImageEditDTO editDTO);
}
