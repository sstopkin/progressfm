package org.progress.fm.util;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.concurrent.ExecutionException;
import org.hibernate.Session;
import org.progress.fm.exceptions.CustomException;

public interface  Command<T> {
    T execute(Session session) throws CustomException, SQLException, NoSuchAlgorithmException,
            IOException, InterruptedException, ExecutionException;
}
