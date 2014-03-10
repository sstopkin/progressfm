package org.progress.fm.controllers;

import java.io.File;
import java.util.List;
import javax.ejb.Singleton;
import org.progress.fm.dao.DaoFactory;

/**
 *
 * @author best
 */
@Singleton
public class FileManagerController {

    public List getRootFolderFileList(String path) {
        return DaoFactory.getFileManagerDao().getFolderFileList(path);
    }

    public File getFileByPath(String path) {
        return DaoFactory.getFileManagerDao().getFileByPath(path);
    }

    public Object getHomeFolder() {
        return DaoFactory.getFileManagerDao().getHomeFolder();
    }

    public Object mkDir(String path) {
        return DaoFactory.getFileManagerDao().mkDir(path);
    }

    public Object removeFile(String path) {
        return DaoFactory.getFileManagerDao().removeFile(path);
    }
}
