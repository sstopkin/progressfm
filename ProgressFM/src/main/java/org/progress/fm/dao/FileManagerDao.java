package org.progress.fm.dao;

import java.io.File;
import java.util.Arrays;
import java.util.List;
import org.hibernate.Session;

/**
 *
 * @author best
 */
public class FileManagerDao {

    public List getRootFolderFileList(Session session) {
        return Arrays.asList(new File("/var/tmp").list());
    }
}
