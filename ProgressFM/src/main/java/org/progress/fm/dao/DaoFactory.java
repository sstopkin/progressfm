package org.progress.fm.dao;

public class DaoFactory {

    public static LogServiceDao getLogServiceDao() {
        return new LogServiceDao();
    }

    public static FileManagerDao getFileManagerDao() {
        return new FileManagerDao();
    }
}
