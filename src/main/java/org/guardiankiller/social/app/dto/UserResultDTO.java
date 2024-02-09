package org.guardiankiller.social.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserResultDTO {
    private final String username;
    private final String firstName;
    private final String lastName;
    private final String url;
}
