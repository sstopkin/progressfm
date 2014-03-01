package org.progress.fm.dao;

import java.io.File;
import java.sql.SQLException;
import java.util.List;
import org.hibernate.Session;
import org.progress.fm.exceptions.CustomException;

public class ReportGeneratorDao {

    public File priceGen(Session session) throws CustomException, SQLException {
        return new File("1");
    }

    public File apartamentsPageGen(Session session) throws CustomException, SQLException {
        return new File("1");
    }
}
