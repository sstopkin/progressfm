package org.progress.fm.dao;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import org.hibernate.Session;

/**
 *
 * @author best
 */
public class FileManagerDao {

    public File getFileByPath(Session session, String path) {
        File result = new File("//" + path);
        return result;
    }

    public List getHomeFolder(Session session) {
        List res=new ArrayList();
        res.add("/tmp");
        return res;
    }

    class CustomFile {

        private final String name;
        private final String path;
        private final String modifyTime;
        private final String size;
        private final boolean isFile;

        public CustomFile(String name, String path, String modifyTime, String size, boolean isFile) {
            this.name = name;
            this.path = path;
            this.modifyTime = modifyTime;
            this.size = size;
            this.isFile = isFile;
        }
    }

    public List getFolderFileList(Session session, String path) {
        // Directory path here
        File folder = new File(path);
        File[] listOfFiles = folder.listFiles();
        List result = new ArrayList();

        for (File file : listOfFiles) {
            String lastMfDate = new SimpleDateFormat("dd/MM/yyyy", Locale.getDefault()).format(new Date(folder.lastModified()));
            result.add(new CustomFile(file.getName(), file.getPath(), lastMfDate, String.valueOf(file.length()), file.isFile()));
        }
        return result;
    }
}
