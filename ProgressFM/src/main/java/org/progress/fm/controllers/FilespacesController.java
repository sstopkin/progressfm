package org.progress.fm.controllers;

import javax.ejb.Singleton;
import org.hibernate.Session;
import org.progress.fm.dao.DaoFactory;

@Singleton
public class FilespacesController {

    int createFilespace(Session session, String filespaceName) {
        return (int) DaoFactory.getFilespacesDao().createFilespace(session, filespaceName);
    }
    
}