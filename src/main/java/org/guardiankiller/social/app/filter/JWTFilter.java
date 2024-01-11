package com.example.socialapp.filter;

import com.example.socialapp.exceptions.AuthenticationException;
import com.example.socialapp.service.AccessTokenAuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    public static final String BEARER_TYPE = "Bearer ";

    public static final String HEADER_AUTHORIZATION = "Authorization";

    private final AccessTokenAuthService service;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
        var header = request.getHeader(HEADER_AUTHORIZATION);
        if(header != null && !header.isBlank() && header.startsWith(BEARER_TYPE)) {
            var token = header.replace(BEARER_TYPE,"");
            try {
                service.loginWithKey(token);
            } catch (AuthenticationException e) {
                log.error("Failed to login", e);
            }
        }

        filterChain.doFilter(request, response);
    }
}
