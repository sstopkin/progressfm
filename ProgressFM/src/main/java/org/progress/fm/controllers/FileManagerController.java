package org.progress.fm.controllers;

import java.io.File;
import java.util.List;
import javax.ejb.Singleton;
import org.hibernate.Session;
import org.progress.fm.dao.DaoFactory;

/**
 *
 * @author best
 */
@Singleton
public class FileManagerController {

    public List getRootFolderFileList(Session session) {
        return DaoFactory.getFileManagerDao().getRootFolderFileList(session);
    }

    public File getFileByPath(Session session, String path) {
        return DaoFactory.getFileManagerDao().getFileByPath(session, path);
    }
}
