package org.guardiankiller.social.app.exception;

import org.springframework.http.HttpStatus;


public class ServerException extends RuntimeException{
    private final HttpStatus httpStatus;
    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public ServerException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public ServerException(Throwable cause, HttpStatus httpStatus) {
        super(cause);
        this.httpStatus = httpStatus;
    }

    public ServerException(String message, Throwable cause, HttpStatus httpStatus) {
        super(message, cause);
        this.httpStatus = httpStatus;
    }
}
