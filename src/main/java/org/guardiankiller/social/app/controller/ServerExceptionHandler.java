package org.guardiankiller.social.app.controller;

import org.guardiankiller.social.app.exception.ServerException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

@ControllerAdvice
public class ServerExceptionHandler {
    @ExceptionHandler(value = {ServerException.class})
    public ResponseEntity<String> exceptionHandling(ServerException serverException){
        return new ResponseEntity<>(serverException.getMessage(), serverException.getHttpStatus());
    }

    @ExceptionHandler(value = {MissingServletRequestPartException.class})
    public ResponseEntity<String> handleNoImage(MissingServletRequestPartException e) {
        return new ResponseEntity<>("You need to upload an image", HttpStatus.BAD_REQUEST);
    }
}
