package org.progress.crm.dao;

public class DaoFactory {

//    public static ReportGeneratorDao getReportGeneratorDao() {
//        return new ReportGeneratorDao();
//    }

    public static LogServiceDao getLogServiceDao() {
        return new LogServiceDao();
    }

    public static FilespacesDao getFilespacesDao() {
        return new FilespacesDao();
    }
}
