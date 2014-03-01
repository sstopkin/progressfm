package org.progress.fm.api;

import java.io.File;
import javax.ws.rs.core.Response;
import org.progress.crm.exceptions.BadRequestException;

public class ApiHelper {

    public static Response getResponse(boolean value) {
        return Response.ok(String.valueOf(value)).build();
    }

    public static Response getResponse(int value) {
        return Response.ok(String.valueOf(value)).build();
    }

    public static Response getResponse(String text) {
        if (text == null) {
            return getResponse(false);
        }
        return Response.ok(text).build();
    }

    public static Response getResponse(File f) {
        Response.ResponseBuilder response = Response.ok((Object) f);
        response.header("Content-Disposition", "attachment; filename=\"price.pdf\"");
        return response.build();
    }

    public static int parseInt(String value) throws BadRequestException {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException ex) {
            throw new BadRequestException();
        }
    }
}
