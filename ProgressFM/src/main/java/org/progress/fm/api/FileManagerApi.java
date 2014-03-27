package org.progress.fm.api;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.File;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import org.progress.fm.controllers.FileManagerController;
import org.progress.fm.exceptions.CustomException;

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
        Gson responce = new GsonBuilder().create();
        String result = responce.toJson(fileManagerController.getRootFolderFileList(path));
        return ApiHelper.getResponse(result);
    }

    @POST
    @Path("mkdir")
    public Response mkDir(@FormParam("path")
            final String path) throws CustomException {
        Gson responce = new GsonBuilder().create();
        String result = responce.toJson(fileManagerController.mkDir(path));
        return ApiHelper.getResponse(result);
    }

    @POST
    @Path("remove")
    public Response removeFile(@FormParam("data")
            final String path) throws CustomException {
        Gson responce = new GsonBuilder().create();
        String result = responce.toJson(fileManagerController.removeFile(path));
        return ApiHelper.getResponse(result);
    }

    @GET
    @Path("getfile/{path:.*}")
    @Produces("application/force-download")
    public Response getPriceByApartamentsId(@PathParam("path") String path) {
        File f = fileManagerController.getFileByPath(path);
        return ApiHelper.getResponse(f);
    }
}
