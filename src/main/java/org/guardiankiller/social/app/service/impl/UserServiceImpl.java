package org.guardiankiller.social.app.service.impl;

import lombok.RequiredArgsConstructor;
import org.guardiankiller.social.app.dto.UserCreateDTO;
import org.guardiankiller.social.app.dto.UserEditDTO;
import org.guardiankiller.social.app.dto.UserFullDTO;
import org.guardiankiller.social.app.dto.UserResultDTO;
import org.guardiankiller.social.app.exception.ServerException;
import org.guardiankiller.social.app.model.User;
import org.guardiankiller.social.app.repository.UserRepo;
import org.guardiankiller.social.app.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
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
        if (!createDTO.getDateOfBirth().isAfter(LocalDate.now().minusYears(13))) {
            throw new ServerException("You must be at least 13 years old.", HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setUsername(createDTO.getUsername());
        user.setUserEmail(createDTO.getUserEmail());
        user.setGender(createDTO.getGender());
        user.setFirstName(createDTO.getFirstName());
        user.setLastName(createDTO.getLastName());
        user.setDateOfBirth(createDTO.getDateOfBirth());
        userRepo.save(user);
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
        return new UserResultDTO(userEntity.getUsername(), userEntity.getFirstName(), userEntity.getLastName());
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
                userEntity.getUpdatedDateTime());
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
    public boolean editUserInfo(String usernameId, UserEditDTO userEditDTO) {
        return userRepo.findById(usernameId)
                .map(user -> {
                    String username = userEditDTO.getUsername();
                    String email = userEditDTO.getUserEmail();
                    LocalDate dateOfBirth = userEditDTO.getDateOfBirth();

                    if (username != null) {
                        if (userRepo.usernameExists(username)) {
                            throw new ServerException("Username Exists", HttpStatus.BAD_REQUEST);
                        } else if (userRepo.usernameExists(username)) {
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
                    return true;
                })
                .orElse(false);

//        Optional<User> opt = userRepo.findById(usernameId);
//        if (opt.isEmpty()) {
//            return false;
//        }
//        User user = opt.get();
////       user.setUsername(userEditDTO.getUsername());
//        Optional.ofNullable(userEditDTO.getUserEmail()).ifPresent(user::setUserEmail);
//
//        if (userEditDTO.getUserEmail() != null) {
//            user.setUserEmail(userEditDTO.getUserEmail());
//        }
//        return true;
    }

}
