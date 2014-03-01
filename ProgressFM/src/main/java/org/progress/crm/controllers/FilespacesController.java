package org.progress.crm.controllers;

import javax.ejb.Singleton;
import org.hibernate.Session;
import org.progress.crm.dao.DaoFactory;

@Singleton
public class FilespacesController {

    int createFilespace(Session session, String filespaceName) {
        return (int) DaoFactory.getFilespacesDao().createFilespace(session, filespaceName);
    }
    
}