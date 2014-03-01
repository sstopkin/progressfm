package org.progress.fm.exceptions;

public class BadLogInException extends CustomException {

    @Override
    public String getMessage() {
        return "Неверные логин/пароль";
    }
}
