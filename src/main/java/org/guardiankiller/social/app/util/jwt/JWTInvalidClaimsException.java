package org.guardiankiller.social.app.util.jwt;

public class JWTInvalidClaimsException extends Exception {

    JWTInvalidClaimsException(String message) {
        super(message);
    }

    JWTInvalidClaimsException(String message, Throwable t) {
        super(message, t);
    }
}
