//package org.progress.crm.dao;
//
//import java.io.File;
//import java.sql.SQLException;
//import java.util.List;
//import org.hibernate.Session;
//import org.progress.crm.exceptions.CustomException;
//
//public class ReportGeneratorDao {
//
//    public File priceGen(Session session, int idWorker) throws CustomException, SQLException {
//        Workers worker = DaoFactory.getWorkersDao().getWorkerById(session, idWorker);
//        String reportAuthorWorkerName = worker.getlName() + " " + worker.getfName() + " " + worker.getmName();
//        List<Object> reportContent = session.createSQLQuery("SELECT "
//                + "Apartaments.id, CityName,StreetName,HouseNumber,BuildingNumber, Floor, Floors, SizeApartament,SizeLiving,SizeKitchen, YearOfConstruction, "
//                + "FName, MName, Lname, "
//                + "customersFName,customersLName,customersMName, customersPhone "
//                + "FROM progresscrm.Apartaments "
//                + "LEFT JOIN progresscrm.Workers ON Apartaments.idWorker=Workers.id "
//                + "LEFT JOIN progresscrm.Customers ON Apartaments.idCustomer=Customers.id;").list();
//        return PDF.GeneratePrice(reportContent, reportAuthorWorkerName);
//    }
//
//    public File apartamentsPageGen(Session session, Integer apartamentsId, int idWorker) throws CustomException, SQLException {
//        Apartaments apartament = DaoFactory.getApartamentsDao().getApartamentsById(session, apartamentsId);
//        Workers worker = DaoFactory.getWorkersDao().getWorkerById(session, idWorker);
//        String workerName = worker.getlName() + " " + worker.getfName() + " " + worker.getmName();
//        return PDF.GenerateApartamentsPage(apartament, workerName);
//    }
//}
