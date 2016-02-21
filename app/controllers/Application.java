package controllers;

import play.*;
import play.mvc.*;

import views.html.*;

public class Application extends Controller {

    public Result index() {
        return ok(index.render("Your new application is ready."));
    }

    public Result newPost() {
        return ok(newpost.render("New Post"));
    }

    public Result posts() {
        return ok();
    }


//    public Result javascriptRoutes() {
//        response().setContentType("text/javascript");
//        return ok(
//                Routes.javascriptRouter("myJsRoutes",
//                        controllers.routes.javascript.Application.moiraiDash(),
//                        controllers.routes.javascript.Application.moiraiProfile()
//                )
//        );
//    }

}
