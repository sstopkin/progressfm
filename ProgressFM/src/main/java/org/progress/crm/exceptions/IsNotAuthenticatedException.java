package org.progress.crm.exceptions;

public class IsNotAuthenticatedException extends CustomException {
    
    @Override
    public String getMessage() {
        return "Вы должны войти в систему для данного действия";
    }
}
