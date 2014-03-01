package org.progress.fm.util;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.concurrent.ExecutionException;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.progress.crm.exceptions.CustomException;

public final class TransactionService {

    public static <T> T runInScope(Command<T> command) throws CustomException {
        Session session = null;
        T status = null;
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            session.beginTransaction();
            status = command.execute(session);
            session.getTransaction().commit();
            return status;
        } catch (HibernateException | SQLException | NoSuchAlgorithmException
                | IOException | InterruptedException | ExecutionException e) {
            session.getTransaction().rollback();
            return status;
        } finally {
            if (session != null && session.isOpen()) {
                session.close();
            }
        }
    }
}
