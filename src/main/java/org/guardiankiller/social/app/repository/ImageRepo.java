package org.guardiankiller.social.app.repository;

import org.guardiankiller.social.app.model.UserImage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Repository
public interface ImageRepo extends JpaRepository<UserImage, Integer> {
    @Query("SELECT ui FROM UserImage ui WHERE ui.user.username = :username AND ui.profileImage = :profileImage")
    Page<UserImage> getImagesByUsername(@Param("username") String username,
                                        Pageable pageable,
                                        @Param("profileImage") boolean profileImage);

    @Query("SELECT ui FROM UserImage ui WHERE ui.user.username = :username AND ui.id = :id")
    Optional<UserImage> getImageByUsernameAndId(@Param("username") String username,
                                                @Param("id") int id);

    @Query("SELECT count (*) > 0 FROM UserImage ui WHERE ui.user.username = :username AND ui.id = :id")
    boolean imageIdExists(@Param("username") String username, @Param("id") int id);

    @Modifying
    @Query("DELETE FROM UserImage ui WHERE ui.user.username = :username AND ui.id = :id")
    void deleteImageByUsernameAndId(@Param("username") String username, @Param("id") int id);

    @Modifying
    @Query("UPDATE UserImage ui SET ui.visibility = 'PUBLIC' WHERE ui.user.username = :username AND ui.visibility = 'CURRENT_PROFILE_IMAGE'")
    void updateCurrentProfileImageToPublic(@Param("username") String username);

    @Query("SELECT ui FROM UserImage ui WHERE ui.user.username = :username AND ui.visibility = 'CURRENT_PROFILE_IMAGE'")
    Optional<UserImage> getCurrentProfileImageByUsername(@Param("username") String username);

    @Query("SELECT COUNT(*) > 0 FROM UserImage image WHERE image.checksum = :checksum")
    boolean imageExists(@Param("checksum") String checksum);
}
