package org.progress.fm.exceptions;

public class DisabledUserException extends CustomException {

    @Override
    public String getMessage() {
        return "Учетная запись отключена";
    }
}
