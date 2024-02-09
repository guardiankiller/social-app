package org.guardiankiller.social.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.guardiankiller.social.app.model.Gender;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class UserFullDTO {
    private final String username;
    private final String firstName;
    private final String lastName;
    private final String userEmail;
    private final LocalDate dateOfBirth;
    private final Gender gender;
    private final LocalDateTime createdDateTime;
    private final LocalDateTime updatedDateTime;
    private final String url;
}
