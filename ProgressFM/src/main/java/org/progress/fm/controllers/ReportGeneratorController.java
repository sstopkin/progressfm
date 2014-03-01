package org.progress.fm.controllers;

import java.io.File;
import java.sql.SQLException;
import java.util.UUID;
import javax.ejb.Singleton;
import org.hibernate.Session;
import org.progress.fm.dao.DaoFactory;
import org.progress.fm.exceptions.CustomException;
import org.progress.fm.exceptions.IsNotAuthenticatedException;

@Singleton
public class ReportGeneratorController {

    public File getPrice(Session session, String token) throws IsNotAuthenticatedException, CustomException, SQLException {
        if (token == null) {
            throw new IsNotAuthenticatedException();
        }
        UUID uuid = UUID.fromString(token);
        return DaoFactory.getReportGeneratorDao().priceGen(session);
    }

    public File getPriceByApartamentsId(Session session, String token, String apartamentId) throws CustomException, SQLException {
        if (token == null) {
            throw new IsNotAuthenticatedException();
        }
        UUID uuid = UUID.fromString(token);
        return DaoFactory.getReportGeneratorDao().apartamentsPageGen(session);
    }
}
