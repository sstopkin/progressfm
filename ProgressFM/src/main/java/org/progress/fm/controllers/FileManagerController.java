package org.progress.fm.controllers;

import java.util.List;
import javax.ejb.Singleton;
import org.hibernate.Session;
import org.progress.fm.dao.DaoFactory;
import org.progress.fm.exceptions.IsNotAuthenticatedException;

/**
 *
 * @author best
 */
@Singleton
public class FileManagerController {

    public static List getRootFolderFileList(Session session, String token) throws IsNotAuthenticatedException {
        if (token == null) {
            throw new IsNotAuthenticatedException();
        }
        return DaoFactory.getFileManagerDao().getRootFolderFileList(session);
    }
}
