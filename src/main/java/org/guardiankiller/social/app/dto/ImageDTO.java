package org.guardiankiller.social.app.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.guardiankiller.social.app.model.VisibilityModifiers;

import java.time.LocalDateTime;
@RequiredArgsConstructor
@Data
public class ImageDTO {
    private final int id;
    private final String url;
    private final long fileSize;
    private final VisibilityModifiers visibility;
    private final LocalDateTime createdDateTime;
    private final String comment;
}
