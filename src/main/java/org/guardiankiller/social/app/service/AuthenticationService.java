package org.guardiankiller.social.app.service;

import org.guardiankiller.social.app.dto.AuthRequestDTO;
import org.guardiankiller.social.app.dto.AuthResponseDTO;

public interface AuthenticationService {

    AuthResponseDTO login(AuthRequestDTO request);

    void loginWithKey(String token);
}
