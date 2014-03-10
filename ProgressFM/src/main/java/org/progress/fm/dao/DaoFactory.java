package org.progress.fm.dao;

public class DaoFactory {

    public static FileManagerDao getFileManagerDao() {
        return new FileManagerDao();
    }
}
