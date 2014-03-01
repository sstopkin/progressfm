package org.progress.crm.controllers;

import java.sql.SQLException;
import javax.ejb.Singleton;
import org.hibernate.Session;
import org.progress.crm.dao.DaoFactory;
import org.progress.crm.exceptions.CustomException;
import org.progress.fm.util.Command;
import org.progress.fm.util.TransactionService;

/**
 *
 * @author best
 */
@Singleton
public class LogServiceController {

    public boolean addEvent(final int idWorker, final String description, final int action) throws CustomException {
        return TransactionService.runInScope(new Command<Boolean>() {
            @Override
            public Boolean execute(Session session) throws CustomException, SQLException {
                DaoFactory.getLogServiceDao().addNewAction(session, idWorker, description, action);
                return true;
            }
        });
    }
}
