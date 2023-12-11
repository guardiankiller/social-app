package org.guardiankiller.social.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_info")
public class User {

    @Id
    @Column(nullable = false)
    private String username;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false)
    private String userEmail;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "created_date_time", nullable = false)
    private LocalDateTime createdDateTime;

    @Column(name = "updated_date_time", nullable = false)
    private LocalDateTime updatedDateTime;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;

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
