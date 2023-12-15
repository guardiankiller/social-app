package org.guardiankiller.social.app.controller;

import org.guardiankiller.social.app.exception.ServerException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ServerExceptionHandler {
    @ExceptionHandler(value = {ServerException.class})
    public ResponseEntity<String> exceptionHandling(ServerException serverException){
        return new ResponseEntity<>(serverException.getMessage(), serverException.getHttpStatus());
    }
}
