package org.progress.crm.exceptions;

public class NotFoundException extends CustomException {
    
    @Override
    public String getMessage() {
        return "По данному запросу контент не найден";
    }
}
