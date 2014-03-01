package org.progress.crm.controllers;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.UUID;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.hibernate.Session;
import org.progress.crm.exceptions.BadFileFormatException;
import org.progress.crm.exceptions.BadRequestException;
import org.progress.crm.exceptions.CustomException;

@Singleton
public class UploadController {

    private final String UPLOAD_FILE_LOCATION = "/tmp";

    public String getUploadedFileContent(Session session, InputStream uploadedInputStream,
            FormDataContentDisposition fileDetail) throws IOException, CustomException {
        if (uploadedInputStream == null || fileDetail == null) {
            throw new BadRequestException();
        }
        String filename = fileDetail.getFileName();
        String type = filename.substring(filename.lastIndexOf('.') + 1);

        if ((!type.equals("txt")) && (!type.equals("html") && (!type.equals("java")))) {
            throw new BadFileFormatException();
        }
        byte[] buffer = new byte[32768];
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        while (true) {
            int readBytesCount = uploadedInputStream.read(buffer);
            if (readBytesCount == -1) {
                break;
            }
            if (readBytesCount > 0) {
                baos.write(buffer, 0, readBytesCount);
            }
        }
        baos.flush();
        baos.close();
        String output = baos.toString("UTF-8");
        output = validateContent(output);
        try {
            uploadedInputStream.close();
        } catch (IOException e) {
            return e.getMessage();
        }
        return output;
    }

    public String validateContent(String content) {
//        FIXME
        //content = content.replaceAll("s!<(s(?:cript|tyle))[^>]*>.*?</\\1>!!gis", "lal");
        content = content.replace("<", "&#60;");
        content = content.replace(">", "&#62;");
//        content = content.replace("<script type=\"text/javascript\">",
//                "&#60;script type=\"text/javascript\"&#62;");
//        content = content.replace("<script>",
//                "&#60;script&#62;");
//        content = content.replace("</script>", "&#60;/script&#62;");
        return content;
    }

    public String addPhoto(Session session, InputStream uploadInputStream, FormDataContentDisposition fileDetail) throws FileNotFoundException, IOException, CustomException {
        String filename = fileDetail.getFileName();
        String type = filename.substring(filename.lastIndexOf('.') + 1);
        UUID newFileName = UUID.randomUUID();

        int read = 0;
        byte[] bytes = new byte[1024];

        File directory = new File(UPLOAD_FILE_LOCATION);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        //fileDetail.getFileName())
        OutputStream out = new FileOutputStream(new File(directory, newFileName.toString() + type));
        while ((read = uploadInputStream.read(bytes)) != -1) {
            out.write(bytes, 0, read);
        }

        out.flush();
        out.close();

//        apartamentsPhotoController.addApartamentPhoto(session, newFileName.toString(), "test", "1");
        return "RESP: " + newFileName.toString() + "." + type;
    }
}
