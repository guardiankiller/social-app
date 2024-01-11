package org.guardiankiller.social.app.repository;

import org.guardiankiller.social.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, String> {
    @Query("SELECT count (*) > 0 FROM User WHERE username = :name")
    boolean usernameExistsInt(@Param("name") String username);

    default boolean usernameExists(String newUsername) {
        if (newUsername == null) {
            return false;
        }
        return usernameExistsInt(newUsername);
    }

    @Query("SELECT count (*) > 0 FROM User WHERE userEmail = :newEmail")
    boolean emailExistsInt(@Param("newEmail") String newEmail);

    default boolean emailExists(String email) {
        if (email == null) {
            return false;
        }
        return emailExistsInt(email);
    }
}
