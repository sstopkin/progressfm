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
import javax.ejb.EJB;
import javax.ejb.Stateless;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.progress.fm.controllers.UploadController;
import org.progress.fm.exceptions.CustomException;

@Stateless
@Path("fileupload")
public class UploadFileServiceApi {

    @EJB
    UploadController uploadController;

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadBinaryFile(
            @FormDataParam("file") final InputStream uploadedInputStream,
            @FormDataParam("file") final FormDataContentDisposition fileDetail,
            @FormDataParam("path") final String path)
            throws CharacterCodingException, IOException, FileNotFoundException, CustomException {
        boolean resp = uploadController.uploadFile(uploadedInputStream, fileDetail, path);
        return ApiHelper.getResponse(resp);
    }
}
