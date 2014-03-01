//package org.progress.fm.api;
//
//import java.io.File;
//import java.sql.SQLException;
//import javax.ejb.EJB;
//import javax.ejb.Stateless;
//import javax.ws.rs.CookieParam;
//import javax.ws.rs.GET;
//import javax.ws.rs.Path;
//import javax.ws.rs.PathParam;
//import javax.ws.rs.Produces;
//import javax.ws.rs.core.Response;
//import org.hibernate.Session;
//import org.progress.crm.controllers.ReportGeneratorController;
//import org.progress.crm.exceptions.CustomException;
//import org.progress.fm.util.Command;
//import org.progress.fm.util.TransactionService;
//
//@Stateless
//@Path("report")
//public class ReportGeneratorAPI {
//
//    @EJB
//    ReportGeneratorController reportGeneratorController;
//
//    @GET
//    @Path("getprice")
//    @Produces("application/pdf")
//    public Response getPrice(@CookieParam("token") final String token) throws CustomException {
//        return TransactionService.runInScope(new Command<Response>() {
//            @Override
//            public Response execute(Session session) throws CustomException, SQLException {
//                File f = reportGeneratorController.getPrice(session, token);
//                return ApiHelper.getResponse(f);
//            }
//        });
//    }
//
//    @GET
//    @Path("getapartamentsreport/{id}")
//    @Produces("application/pdf")
//    public Response getPriceByApartamentsId(@PathParam("id") final String apartamentId,
//            @CookieParam("token") final String token) throws CustomException {
//        return TransactionService.runInScope(new Command<Response>() {
//            @Override
//            public Response execute(Session session) throws CustomException, SQLException {
//                File f = reportGeneratorController.getPriceByApartamentsId(session, token, apartamentId);
//                return ApiHelper.getResponse(f);
//            }
//        });
//    }
//}
