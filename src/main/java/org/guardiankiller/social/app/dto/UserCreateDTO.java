package org.guardiankiller.social.app.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.guardiankiller.social.app.model.Gender;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserCreateDTO {
    public static class Builder{
        private String username;
        private String firstName;
        private String lastName;
        private String userEmail;
        private LocalDate dateOfBirth;
        private Gender gender;
        private String password;

        private String confirmPassword;

        public Builder setUsername(String username) {
            this.username = username;
            return this;
        }

        public Builder setFirstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public Builder setLastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public Builder setUserEmail(String userEmail) {
            this.userEmail = userEmail;
            return this;
        }

        public Builder setDateOfBirth(LocalDate dateOfBirth) {
            this.dateOfBirth = dateOfBirth;
            return this;
        }

        public Builder setGender(Gender gender) {
            this.gender = gender;
            return this;
        }

        public Builder setPassword(String password) {
            this.password = password;
            return this;
        }

        public Builder setConfirmPassword(String confirmPassword) {
            this.confirmPassword = confirmPassword;
            return this;
        }

        public UserCreateDTO build(){
            return new UserCreateDTO(username, firstName, lastName, userEmail,
                dateOfBirth, gender, password, confirmPassword);
        }
    }

    public static Builder builder(){
        return new Builder();
    }

    private String username;
    private String firstName;
    private String lastName;
    private String userEmail;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String password;
    private String confirmPassword;
}
