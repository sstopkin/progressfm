package org.progress.fm.dao;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author best
 */
public class FileManagerDao {

    public File getFileByPath(String path) {
        File result = new File("//" + path);
        return result;
    }

    public List getHomeFolder() {
        List res = new ArrayList();
        res.add("/tmp");
        return res;
    }

    public boolean mkDir(String path) {
        return (new File(path)).mkdir();
    }

    public boolean removeFile(String path) {
        String[] parts = path.replaceAll("\"", "").split(",");
        List<String> wordList = Arrays.asList(parts);
        for (String f : wordList) {
            File file = new File(f);
            if (file.isDirectory()) {
                try {
                    delete(file);
                } catch (IOException ex) {
                    Logger.getLogger(FileManagerDao.class.getName()).log(Level.SEVERE, null, ex);
                }
                if (file.delete()) {
                    System.out.println(file.getName() + " is deleted!");
                } else {
                    System.out.println("Delete operation is failed.");
                }
            }
        }
        return true;
    }

    void delete(File f) throws IOException {
        if (f.isDirectory()) {
            for (File c : f.listFiles()) {
                delete(c);
            }
        }
        if (!f.delete()) {
            throw new FileNotFoundException("Failed to delete file: " + f);
        }
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

    public List getFolderFileList(String path) {
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
