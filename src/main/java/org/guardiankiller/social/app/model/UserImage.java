package org.guardiankiller.social.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_images")
public class UserImage {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String checksum;

    @Column(name = "file_size", nullable = false)
    private long fileSize;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private VisibilityModifiers visibility;

    @Column(name = "created_date_time", nullable = false)
    private LocalDateTime createdDateTime;

    @Column(name = "updated_date_time", nullable = false)
    private LocalDateTime updatedDateTime;

    @ManyToOne
    @JoinColumn(name = "username", nullable = false)
    private User user;

    @Column
    private String comment;

    @PrePersist
    private void prePersist() {
        createdDateTime = LocalDateTime.now(ZoneOffset.UTC);
        updatedDateTime = createdDateTime;
    }

    @PreUpdate
    private void preUpdate() {
        updatedDateTime = LocalDateTime.now(ZoneOffset.UTC);
    }
}
