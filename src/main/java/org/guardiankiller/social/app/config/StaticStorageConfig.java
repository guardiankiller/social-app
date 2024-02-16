package org.guardiankiller.social.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;

@Configuration
@EnableWebMvc
public class StaticStorageConfig implements WebMvcConfigurer {
    public static Path UPLOAD_DIRECTORY = Path.of(System.getProperty("user.dir"), "images");
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
            .addResourceHandler("/**").addResourceLocations("classpath:/static/");

        registry.addResourceHandler("/storage/**")
                .addResourceLocations(String.valueOf(UPLOAD_DIRECTORY.toUri()));
    }
}
