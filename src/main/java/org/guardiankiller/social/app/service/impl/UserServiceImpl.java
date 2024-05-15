package org.guardiankiller.social.app.service.impl;

import lombok.RequiredArgsConstructor;
import org.guardiankiller.social.app.dto.UserCreateDTO;
import org.guardiankiller.social.app.dto.UserEditDTO;
import org.guardiankiller.social.app.dto.UserFullDTO;
import org.guardiankiller.social.app.dto.UserResultDTO;
import org.guardiankiller.social.app.exception.ServerException;
import org.guardiankiller.social.app.model.User;
import org.guardiankiller.social.app.model.UserImage;
import org.guardiankiller.social.app.repository.ImageRepo;
import org.guardiankiller.social.app.repository.UserRepo;
import org.guardiankiller.social.app.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepo userRepo;
    private final ImageRepo imageRepo;

    private final PasswordEncoder passwordEncoder;
    private final Pattern emailValidator = Pattern.compile("^[\\w.]+@([\\w-]+\\.)+[\\w-]{2,4}$");

    @Override
    @Transactional
    public void register(UserCreateDTO createDTO) {
        String username = createDTO.getUsername();
        String email = createDTO.getUserEmail();
        if (username.isEmpty()) {
            throw new ServerException("Username is required", HttpStatus.BAD_REQUEST);
        }
        if (userRepo.usernameExists(username)) {
            throw new ServerException("Username already exists", HttpStatus.BAD_REQUEST);
        }
        if (username.length() < 4 || username.length() > 15) {
            throw new ServerException("Username must be between 4 and 15 symbols", HttpStatus.BAD_REQUEST);
        }
        if (!emailValidator.matcher(createDTO.getUserEmail()).matches()) {
            throw new ServerException("Invalid email!", HttpStatus.BAD_REQUEST);
        }
        if (userRepo.emailExists(email)) {
            throw new ServerException("Email already exists", HttpStatus.BAD_REQUEST);
        }
        if (createDTO.getDateOfBirth().isAfter(LocalDate.now().minusYears(13))) {
            throw new ServerException("You must be at least 13 years old.", HttpStatus.BAD_REQUEST);
        }
        validatePasswords(createDTO);

        User user = new User();
        user.setUsername(createDTO.getUsername());
        user.setUserEmail(createDTO.getUserEmail());
        user.setGender(createDTO.getGender());
        user.setFirstName(createDTO.getFirstName());
        user.setLastName(createDTO.getLastName());
        user.setDateOfBirth(createDTO.getDateOfBirth());
        user.setHash(passwordEncoder.encode(createDTO.getPassword()));
        userRepo.save(user);
    }

    private void validatePasswords(UserCreateDTO userCreateDTO) {
        String invalidPasswordMessage = "A valid password should be between 8 and 26 characters";
        String password = userCreateDTO.getPassword();
        String confirm = userCreateDTO.getConfirmPassword();
        if (password == null) {
            throw new ServerException(invalidPasswordMessage, HttpStatus.BAD_REQUEST);
        }
        password = password.trim();
        int len = password.length();
        if (len < 8 || len > 26) {
            throw new ServerException(invalidPasswordMessage, HttpStatus.BAD_REQUEST);
        }

        if (confirm == null || !confirm.trim().equals(password)) {
            throw new ServerException("Passwords must match", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResultDTO> getAllUsers() {
        return userRepo.findAll()
                .stream()
                .map(userEntity -> this.userResultDTO(userEntity))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UserFullDTO> getUserByUsername(String usernameId) {
        return userRepo.findById(usernameId)
                .map(userEntity -> this.userFullDTO(userEntity));
    }

    private UserResultDTO userResultDTO(User userEntity) {
        return new UserResultDTO(userEntity.getUsername(),
                userEntity.getFirstName(),
                userEntity.getLastName(),
                getCurrProfileImageURL(userEntity));
    }

    private String getCurrProfileImageURL(User userEntity) {
        Optional<UserImage> opt = imageRepo.getCurrentProfileImageByUsername(userEntity.getUsername());
        String profileImageUrl = null;
        if (opt.isPresent()) {
            UserImage image = opt.orElseThrow();
            profileImageUrl = "/storage/" + userEntity.getUsername() + "/" + image.getFileName();
        }
        return profileImageUrl;
    }

    private Integer getCurrProfileImageId(User userEntity) {
        Optional<UserImage> opt = imageRepo.getCurrentProfileImageByUsername(userEntity.getUsername());
        Integer profileImageId = null;
        if (opt.isPresent()) {
            UserImage image = opt.orElseThrow();
            profileImageId = image.getId();
        }
        return profileImageId;
    }

    private UserFullDTO userFullDTO(User userEntity) {
        return new UserFullDTO(
                userEntity.getUsername(),
                userEntity.getFirstName(),
                userEntity.getLastName(),
                userEntity.getUserEmail(),
                userEntity.getDateOfBirth(),
                userEntity.getGender(),
                userEntity.getCreatedDateTime(),
                userEntity.getUpdatedDateTime(),
                getCurrProfileImageURL(userEntity),
            getCurrProfileImageId(userEntity));
    }

    @Override
    @Transactional
    public void deleteUserByUsername(String usernameId) {
        if (!userRepo.usernameExists(usernameId)) {
            throw new ServerException("Username does not exist", HttpStatus.NOT_FOUND);
        }
        userRepo.deleteById(usernameId);
    }

    @Override
    @Transactional
    public void editUserInfo(String usernameId, UserEditDTO userEditDTO) {
        User user = userRepo.findById(usernameId)
                .orElseThrow(() -> new ServerException("Username not found", HttpStatus.NOT_FOUND));
        String username = userEditDTO.getUsername();
        String email = userEditDTO.getUserEmail();
        LocalDate dateOfBirth = userEditDTO.getDateOfBirth();

        if (username != null) {
            if (userRepo.usernameExists(username)) {
                throw new ServerException("Username already exists", HttpStatus.BAD_REQUEST);
            }
            if (username.length() < 4 || username.length() > 15) {
                throw new ServerException("Username must be between 4 and 15 symbols", HttpStatus.BAD_REQUEST);
            }
        }

        if (email != null) {
            if (!emailValidator.matcher(email).matches()) {
                throw new ServerException("Invalid email!", HttpStatus.BAD_REQUEST);
            }
            if (userRepo.emailExists(email)) {
                throw new ServerException("Email already exists", HttpStatus.BAD_REQUEST);
            }
        }

        if (dateOfBirth != null) {
            if (!userEditDTO.getDateOfBirth().isAfter(LocalDate.now().minusYears(13))) {
                throw new ServerException("You must be at least 13 years old.", HttpStatus.BAD_REQUEST);
            }
        }

        Optional.ofNullable(userEditDTO.getUsername())
                .ifPresent(user::setUsername);
        Optional.ofNullable(userEditDTO.getFirstName())
                .ifPresent(user::setFirstName);
        Optional.ofNullable(userEditDTO.getLastName())
                .ifPresent(user::setLastName);
        Optional.ofNullable(userEditDTO.getUserEmail())
                .ifPresent(user::setUserEmail);
        Optional.ofNullable(userEditDTO.getDateOfBirth())
                .ifPresent(user::setDateOfBirth);
        Optional.ofNullable(userEditDTO.getGender())
                .ifPresent(user::setGender);
    }

    @Override
    public boolean authenticateUser(String username, String password) {
        return userRepo
                .findById(username)
                .map(user -> passwordEncoder.matches(password, user.getHash()))
                .orElse(false);
    }

    @Override
    public UserDetails loadUserByUsername(String username, LocalDateTime verifyDate) {
        var user = userRepo
                .findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
        if (user.getUpdatedDateTime().minusMinutes(10).isAfter(verifyDate)) {
            throw new ServerException("Token expired", HttpStatus.UNAUTHORIZED);
        }
        return new org.springframework.security.core.userdetails
                .User(user.getUsername(), user.getHash(), Set.of());
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userRepo.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found"));
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(), user.getHash(), List.of()
        );
    }

    @Override
    public String getCurrentUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
