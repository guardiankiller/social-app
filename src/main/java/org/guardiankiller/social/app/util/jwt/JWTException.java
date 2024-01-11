package org.guardiankiller.social.app.util.jwt;

public class JWTException extends RuntimeException {

    public JWTException(String message, Throwable t) {
        super(message, t);
    }

    public JWTException(String message) {
        super(message);
    }
}
