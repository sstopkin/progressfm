package org.progress.fm.exceptions;

public class BadRequestException extends CustomException {
    
    @Override
    public String getMessage() {
        return "Неверные параметры запроса";
    }
}
