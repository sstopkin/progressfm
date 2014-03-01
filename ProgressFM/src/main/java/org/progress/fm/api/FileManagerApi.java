package org.progress.fm.api;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.File;
import java.sql.SQLException;
import javax.ejb.Stateless;
import javax.ws.rs.CookieParam;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import org.hibernate.Session;
import org.progress.fm.controllers.FileManagerController;
import org.progress.fm.exceptions.CustomException;
import org.progress.fm.util.Command;
import org.progress.fm.util.TransactionService;

/**
 *
 * @author best
 */
@Stateless
@Path("fm")
public class FileManagerApi {
    @GET
    @Path("getroot")
    public Response getRootFolderFileList(@CookieParam("token") final String token) throws CustomException {
        return TransactionService.runInScope(new Command<Response>() {
            @Override
            public Response execute(Session session) throws CustomException, SQLException {
                Gson rootFolderFileList = new GsonBuilder().create();
                String result = rootFolderFileList.toJson(FileManagerController.getRootFolderFileList(session, token));
                return ApiHelper.getResponse(result);
            }
        });
    }

    @GET
    @Path("getapartamentsreport/{id}")
    @Produces("application/pdf")
    public Response getPriceByApartamentsId(@PathParam("id") final String apartamentId,
            @CookieParam("token") final String token) throws CustomException {
        return TransactionService.runInScope(new Command<Response>() {
            @Override
            public Response execute(Session session) throws CustomException, SQLException {
//                File f = reportGeneratorController.getPriceByApartamentsId(session, token, apartamentId);
//                return ApiHelper.getResponse(f);
                return null;
            }
        });
    }
}
