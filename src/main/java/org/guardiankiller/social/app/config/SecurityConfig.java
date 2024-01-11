package org.guardiankiller.social.app.config;

import org.guardiankiller.social.app.filter.JWTFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JWTFilter filter) throws Exception {
        return http.cors(AbstractHttpConfigurer::disable)
                   .csrf(AbstractHttpConfigurer::disable)

                   .authorizeHttpRequests(x->x
                                                 .requestMatchers(HttpMethod.POST, "/auth", "/users").permitAll()
                                                 .anyRequest().authenticated())
                   .sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                   .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
                   .httpBasic(AbstractHttpConfigurer::disable)
                   .anonymous(AbstractHttpConfigurer::disable)
                   .build();
    }
}
