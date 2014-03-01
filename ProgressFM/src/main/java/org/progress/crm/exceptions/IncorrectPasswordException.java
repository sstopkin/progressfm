package org.progress.crm.exceptions;

public class IncorrectPasswordException extends CustomException {
    
    @Override
    public String getMessage() {
        return "Старый пароль неверен";
    }
}
