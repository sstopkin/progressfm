package org.progress.fm.dao;

import java.util.List;
import org.hibernate.Session;
import org.progress.fm.logic.Files;

/**
 *
 * @author best
 */
public class FileManagerDao {

    public List getRootFolderFileList(Session session) {
        Files fs = new Files();
        session.save(fs);
//        return fs.getId();
        return null;
    }
}
