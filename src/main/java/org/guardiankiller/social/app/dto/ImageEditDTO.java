package org.guardiankiller.social.app.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.guardiankiller.social.app.model.VisibilityModifiers;

@NoArgsConstructor
@Data
public class ImageEditDTO {
    private VisibilityModifiers visibility;
    private String comment;
}
