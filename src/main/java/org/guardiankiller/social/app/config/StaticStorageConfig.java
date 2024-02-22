package org.guardiankiller.social.app.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.util.StdDateFormat;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;

@Configuration
public class StaticStorageConfig implements WebMvcConfigurer {
    public static Path UPLOAD_DIRECTORY = Path.of(System.getProperty("user.dir"), "images");
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
            .addResourceHandler("/**").addResourceLocations("classpath:/static/");

        registry.addResourceHandler("/storage/**")
                .addResourceLocations(String.valueOf(UPLOAD_DIRECTORY.toUri()));
    }

    @Bean
    @Primary
    public ObjectMapper objectMapper() {
        var module = new JavaTimeModule();

        return new ObjectMapper()
                   .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
                   .registerModule(new JavaTimeModule())
                   .setDateFormat(new StdDateFormat());
    }
}
