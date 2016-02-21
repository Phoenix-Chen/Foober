package controllers;

import org.bson.Document;
import play.*;
import play.mvc.*;

import views.html.*;

import java.util.ArrayList;
import java.util.Iterator;

public class Application extends Controller {

    public Result index() {
        return ok(dishes.render("Foober"));
    }

    public Result newPost() {
        return ok(newpost.render("New Post"));
    }

    public Result profile(String uId){ return ok(profile.render(uId)); }

    public Result getPosts() {
        ArrayList<Document> arrayList = mongodb.findFreshPosts();
        String ret = "[";
        Iterator<Document> i = arrayList.iterator();
        while(i.hasNext())
        {
            ret += i.next().toJson().toString() + ",";
        }
        ret = ret.substring(0,ret.length()-1)+"]";
        return ok(ret);
    }

    public Result getCookNameById(String cId){
        Document cook = mongodb.find("cooks", cId);
        Document name = (Document) cook.get("name");

        return ok(name.getString("first") + " " + name.getString("last"));
    }

    public Result getPostsByCook(String cId, String condition){
        return ok(mongodb.getPosts(condition, cId).toArray().toString());
    }

    public Result javascriptRoutes() {
        response().setContentType("text/javascript");
        return ok(
                Routes.javascriptRouter("myJsRoutes",
                        controllers.routes.javascript.Application.getPosts(),
                        controllers.routes.javascript.Application.getCookNameById(),
                        controllers.routes.javascript.Application.profile(),
                        controllers.routes.javascript.Application.getPostsByCook()
                )
        );
    }

}
