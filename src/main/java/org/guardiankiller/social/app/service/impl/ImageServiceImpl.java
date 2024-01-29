package org.guardiankiller.social.app.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.guardiankiller.social.app.dto.ImageDTO;
import org.guardiankiller.social.app.dto.ImageEditDTO;
import org.guardiankiller.social.app.exception.ServerException;
import org.guardiankiller.social.app.model.User;
import org.guardiankiller.social.app.model.UserImage;
import org.guardiankiller.social.app.model.VisibilityModifiers;
import org.guardiankiller.social.app.repository.ImageRepo;
import org.guardiankiller.social.app.repository.UserRepo;
import org.guardiankiller.social.app.service.ImageService;
import org.guardiankiller.social.app.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final UserService service;
    private final UserRepo userRepo;
    private final ImageRepo imageRepo;
    public static Path UPLOAD_DIRECTORY = Path.of(System.getProperty("user.dir"), "images");

    @Override
    @Transactional
    public void uploadImage(String usernameId, MultipartFile image, VisibilityModifiers modifiers) {
        if (!service.getCurrentUsername().equals(usernameId)) {
            throw new ServerException("You do not hava access to this resource", HttpStatus.FORBIDDEN);
        }
        try {
            var contentType = image.getContentType();
            if (contentType == null) {
                throw new ServerException("The request does not have a content type", HttpStatus.BAD_REQUEST);
            }
            if (!contentType.startsWith("image/")) {
                throw new ServerException("Content type must be an image", HttpStatus.BAD_REQUEST);
            }
            log.info("Content type {}", image.getContentType());
            Files.createDirectories(UPLOAD_DIRECTORY);

            String checksum = calculateSha256Sum(image);
            String fileExt = contentType.replace("image/", "");

            String fileName = usernameId + "_" + checksum + "." + fileExt;
            Path filepath = UPLOAD_DIRECTORY.resolve(usernameId).resolve(fileName);
            // filepath = C:\Users\nomor\IdeaProjects\Social App\images\guardiankiller\guardiankiller_8983bc8f363448191b9cc8e131ce143160b53b323985e16a31fa8e0379559007.jpeg
            // filepath.gethParent() = C:\Users\nomor\IdeaProjects\Social App\images\guardiankiller
            Files.createDirectories(filepath.getParent());

            log.info("Saving file: {}", filepath);
            Files.write(filepath, image.getBytes(), StandardOpenOption.CREATE);

            UserImage userImage = new UserImage();
            userImage.setChecksum(checksum);
            userImage.setFileSize(Files.size(filepath));
            userImage.setFileName(fileName);
            User user = userRepo.findById(usernameId).orElseThrow(
                    () -> new ServerException("User does not exist", HttpStatus.NOT_FOUND));
            userImage.setUser(user);

            userImage.setVisibility(modifiers);
            imageRepo.save(userImage);

        } catch (IOException e) {
            log.error("Failed to upload the image: {}", e.getMessage());
            throw new ServerException("Failed to upload the image", e, HttpStatus.BAD_REQUEST);
        }

    }

    private static String calculateSha256Sum(MultipartFile imageFile) throws IOException {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedhash = digest.digest(imageFile.getBytes());
            return bytesToHex(encodedhash);
        } catch (NoSuchAlgorithmException e) {
            throw new IOException(e);
        }
    }

    private static String bytesToHex(byte[] hash) {
        StringBuilder hexString = new StringBuilder(2 * hash.length);
        for (int i = 0; i < hash.length; i++) {
            String hex = Integer.toHexString(0xff & hash[i]);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ImageDTO> getImage(String usernameId, int imageId) {
        return imageRepo.getImageByUsernameAndId(usernameId, imageId).map(e -> {
            return new ImageDTO(e.getId(),
                    "/storage/" + usernameId + "/" + e.getFileName(),
                    e.getFileSize(),
                    e.getVisibility(),
                    e.getCreatedDateTime());
        });
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ImageDTO> getAllImages(String usernameId, Pageable pageable) {
        return imageRepo.getImagesByUsername(usernameId, pageable).map(e -> {
            return new ImageDTO(
                    e.getId(),
                    "/storage/" + usernameId + "/" + e.getFileName(),
                    e.getFileSize(),
                    e.getVisibility(),
                    e.getCreatedDateTime());
        });
    }

    @Override
    @Transactional
    public void deleteImageByUsernameAndId(String username, int id) {
//        Optional<UserImage> optUI = imageRepo.getImageByUsernameAndId(username, id);
//        UserImage ui = optUI.orElseThrow(()-> new ServerException("Image does not exist", HttpStatus.NOT_FOUND));
//        imageRepo.delete(ui);
        if (!imageRepo.imageIdExists(username, id)) {
            throw new ServerException("Image does not exist", HttpStatus.NOT_FOUND);
        }
        imageRepo.deleteImageByUsernameAndId(username, id);
    }

    @Override
    @Transactional
    public void editImage(String usernameId, int imageId, ImageEditDTO editDTO) {
        UserImage userImage = imageRepo.getImageByUsernameAndId(usernameId, imageId)
                .orElseThrow(() -> new ServerException("Image not found", HttpStatus.NOT_FOUND));
        VisibilityModifiers modifier = editDTO.getVisibility();
        if (modifier != null) {
            userImage.setVisibility(modifier);
        }
    }
}
