package org.progress.crm.exceptions;

public class BadFileFormatException extends CustomException {
    
    @Override
    public String getMessage() {
        return "Неверный формат файла";
    }
}
