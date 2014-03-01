package org.progress.fm.dao;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.Session;

/**
 *
 * @author best
 */
public class FileManagerDao {

    public File getFileByPath(Session session, String path) {
        File result = new File(path);
        return result;
    }

    class CustomFile {

        private final String name;
        private final String path;
        private final boolean isFile;

        public CustomFile(String name, String path, boolean isFile) {
            this.name = name;
            this.path = path;
            this.isFile = isFile;
        }
    }

    public List getRootFolderFileList(Session session) {
        // Directory path here
        File folder = new File("/var/tmp");
        File[] listOfFiles = folder.listFiles();
        List result = new ArrayList();
        for (File file : listOfFiles) {
            result.add(new CustomFile(file.getName(), file.getPath(), file.isFile()));
        }
        return result;
    }
}
