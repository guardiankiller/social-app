package org.guardiankiller.social.app.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.guardiankiller.social.app.model.Gender;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class UserEditDTO {
    private String username;
    private String firstName;
    private String lastName;
    private String userEmail;
    private LocalDate dateOfBirth;
    private Gender gender;

}
