package org.guardiankiller.social.app.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.guardiankiller.social.app.dto.AuthRequestDTO;
import org.guardiankiller.social.app.dto.AuthResponseDTO;
import org.guardiankiller.social.app.service.AuthenticationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping
    public AuthResponseDTO requestKey(@RequestBody AuthRequestDTO request) {
        return service.login(request);
    }
}
