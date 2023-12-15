package org.guardiankiller.social.app.service;

import org.guardiankiller.social.app.dto.UserCreateDTO;
import org.guardiankiller.social.app.dto.UserEditDTO;
import org.guardiankiller.social.app.dto.UserFullDTO;
import org.guardiankiller.social.app.dto.UserResultDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserService {
    void register(UserCreateDTO createDTO);

    List<UserResultDTO> getAllUsers();

    Optional<UserFullDTO> getUserByUsername(String usernameId);

    void deleteUserByUsername(String usernameId);

    boolean editUserInfo(String usernameId, UserEditDTO userEditDTO);

}
