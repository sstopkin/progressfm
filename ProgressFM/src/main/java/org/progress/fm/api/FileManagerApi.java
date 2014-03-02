package org.progress.fm.api;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.File;
import java.sql.SQLException;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
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

    @EJB
    FileManagerController fileManagerController;

    @POST
    @Path("getfilelist")
    public Response getFolderFileList(@FormParam("path") final String path) throws CustomException {
        return TransactionService.runInScope(new Command<Response>() {
            @Override
            public Response execute(Session session) throws CustomException, SQLException {
                Gson rootFolderFileList = new GsonBuilder().create();
                String result = rootFolderFileList.toJson(fileManagerController.getRootFolderFileList(session, path));
                return ApiHelper.getResponse(result);
            }
        });
    }

    @GET
    @Path("gethome")
    public Response getFolderFileList() throws CustomException {
        return TransactionService.runInScope(new Command<Response>() {
            @Override
            public Response execute(Session session) throws CustomException, SQLException {
                Gson rootFolderFileList = new GsonBuilder().create();
                String result = rootFolderFileList.toJson(fileManagerController.getHomeFolder(session));
                return ApiHelper.getResponse(result);
            }
        });
    }

    @GET
    @Path("getfile/{path:.*}")
    @Produces("application/force-download")
    public Response getPriceByApartamentsId(@PathParam("path") final String path) throws CustomException {
        return TransactionService.runInScope(new Command<Response>() {
            @Override
            public Response execute(Session session) throws CustomException, SQLException {
                File f = fileManagerController.getFileByPath(session, path);
                return ApiHelper.getResponse(f);
            }
        });
    }
}
