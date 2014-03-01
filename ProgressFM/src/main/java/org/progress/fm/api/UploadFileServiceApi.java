package org.progress.fm.api;

import java.io.IOException;
import java.io.InputStream;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.FileNotFoundException;
import java.nio.charset.CharacterCodingException;
import java.sql.SQLException;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.hibernate.Session;
import org.progress.fm.controllers.UploadController;
import org.progress.fm.exceptions.CustomException;
import org.progress.fm.util.Command;
import org.progress.fm.util.TransactionService;

@Stateless
@Path("fileupload")
public class UploadFileServiceApi {

    @EJB
    UploadController uploadController;

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadBinaryFile(
            @FormDataParam("file") final InputStream uploadedInputStream,
            @FormDataParam("file") final FormDataContentDisposition fileDetail)
            throws CharacterCodingException, IOException, FileNotFoundException, CustomException {
        return TransactionService.runInScope(new Command<Response>() {
            @Override
            public Response execute(Session session) throws CustomException, SQLException, FileNotFoundException, IOException {
                String resp = uploadController.uploadFile(session, uploadedInputStream, fileDetail);
                return ApiHelper.getResponse(resp);
            }
        });
    }
}
