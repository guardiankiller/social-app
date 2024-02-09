package org.guardiankiller.social.app.service.impl;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.guardiankiller.social.app.dto.AuthRequestDTO;
import org.guardiankiller.social.app.dto.AuthResponseDTO;
import org.guardiankiller.social.app.dto.UserFullDTO;
import org.guardiankiller.social.app.exception.ServerException;
import org.guardiankiller.social.app.service.AuthenticationService;
import org.guardiankiller.social.app.service.UserService;
import org.guardiankiller.social.app.util.jwt.JWTClaims;
import org.guardiankiller.social.app.util.jwt.JWTExpiredException;
import org.guardiankiller.social.app.util.jwt.JWTInvalidClaimsException;
import org.guardiankiller.social.app.util.jwt.JWTInvalidSignatureException;
import org.guardiankiller.social.app.util.jwt.JWTKeyEntry;
import org.guardiankiller.social.app.util.jwt.JWTKeystore;
import org.guardiankiller.social.app.util.jwt.JWTUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserService userService;

    private static final long DURATION_IN_MIN = 30;

    private JWTKeyEntry keyEntry;

    @PostConstruct
    public void setup() {
        JWTKeystore keystore = JWTKeystore.fromClasspath("keystore", "changeit");
        keyEntry = keystore.getEntry("access-token-key", "changeit");
        System.out.println(keyEntry);
    }

    @Override
    public AuthResponseDTO login(AuthRequestDTO request) {
        ServerException e = new ServerException("Invalid credentials", HttpStatus.UNAUTHORIZED);
        UserFullDTO user = userService.getUserByUsername(request.getUsername()).orElseThrow(() -> e);
        if (!userService.authenticateUser(request.getUsername(), request.getPassword())) {
            throw e;
        }

        return generateJWT(user);
    }

    private AuthResponseDTO generateJWT(UserFullDTO user) {
        var claims = JWTUtils.newClaims();
        claims.setSubject("User Details");
        claims.setIssuer("social-app");
        claims.addClaim("username", user.getUsername());
        claims.addClaim("firstName", user.getFirstName());
        claims.addClaim("lastname", user.getLastName());
        claims.addClaim("url", user.getUrl());
        var exp = LocalDateTime.now().plusMinutes(DURATION_IN_MIN);
        claims.setExpiration(exp);
        var token = JWTUtils.sign(claims, keyEntry);
        return new AuthResponseDTO(token, exp, "Bearer");
    }

    @Override
    public void loginWithKey(String token) {
        try {
            var claims = JWTUtils.verify(token, keyEntry);
            authenticate(getUsername(claims), claims.getIssuedAt());
        } catch (JWTInvalidClaimsException | JWTExpiredException | JWTInvalidSignatureException |
                 UsernameNotFoundException e) {
            throw new ServerException("Invalid JWT token", HttpStatus.UNAUTHORIZED);
        }
    }

    private void authenticate(String username, LocalDateTime jwtCreationDate) {
        var user = userService.loadUserByUsername(username, jwtCreationDate);
        var authToken = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword(),
                user.getAuthorities());
        if (SecurityContextHolder
                .getContext().getAuthentication() == null) {
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
    }

    private String getUsername(JWTClaims claims) {
        return claims.getClaim("username");
    }
}
