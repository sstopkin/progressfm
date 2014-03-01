package org.progress.fm.dao;

import org.hibernate.Session;
import org.progress.fm.logic.Filespaces;

public class FilespacesDao {
    public int createFilespace(Session session, String filespaceName){
        Filespaces fs=new Filespaces(filespaceName);
        session.save(fs);
        return fs.getId();
    };
}
