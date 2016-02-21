package controllers;
/**
 * Created by JASON on 2/20/16.
 */
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.*;
import java.util.ArrayList;
import java.util.Iterator;

public class mongodb
{
    static MongoClient mongoClient = new MongoClient("localhost", 27017);
    static MongoDatabase db = mongoClient.getDatabase("Foober");

///*
//    public static void main(String args[]) {
//        MongoClient mongoClient = new MongoClient("localhost", 27017); //Exception
//
//        @SuppressWarnings("deprecation")
//        db = mongoClient.getDatabase("Foober");
//
//        for (String name: db.listCollectionNames()) {
//            System.out.println("Collection Name: " + name);
//            MongoCollection<Document> coll = db.getCollection(name);
//            System.out.println("# of Data in Collection: " + coll.count());
//        }
//
//        System.out.println("demonstrating find(collection, id)");
//        System.out.println(find("users", "56c95f31dbe73c089dbdc992"));
//        System.out.println("###########");
//
//        System.out.println("demonstrating find(collection)");
//        Iterator<Document> i = find("users").iterator();
//        while(i.hasNext())
//        {
//            System.out.println(i.next().toJson());
//        }
//        System.out.println("###########");
//
//        System.out.println("demonstrating findPosts(cook_id)");
//        Iterator<Document> iterator = findPosts("56c94e8445b863f3bafd3c09").iterator();
//        while(iterator.hasNext())
//        {
//            System.out.println(iterator.next().toJson());
//        }
//        System.out.println("###########");
//    }
//*/

    //find that specifies the collection("cooks", "users", or "posts") and id(a String)
    public static Document find(String collection, String id)
    {
        MongoCollection<Document> coll = db.getCollection(collection);
        return coll.find(new Document("_id", id)).first();
    }

    //find all the data of a collection("posts", "users", or "cooks")
    //return a ArrayList<Document> object
    //use iterator<Document> to access the individual data
    public static ArrayList<Document> find(String collection)
    {
        ArrayList<Document> array = new ArrayList<Document>();

        MongoCollection<Document> coll = db.getCollection(collection);
        Iterator<Document> i = coll.find().iterator();
        while(i.hasNext())
        {
            array.add(i.next());
        }

        return array;
    }

    //find all the posts of a given cooks

    public static ArrayList<Document> findPosts(String cook_id)
    {
        ArrayList<Document> array = new ArrayList<Document>();
        ArrayList<String> posts_array;
        MongoCollection<Document> cooks_coll = db.getCollection("cooks");
        MongoCollection<Document> posts_coll = db.getCollection("posts");

        //find a specific cook
        Document cook = cooks_coll.find(new Document("_id", cook_id)).first();

        System.out.println(cook.get("posts"));
        posts_array = (ArrayList<String>)cook.get("posts");

        for (int i = 0; i < posts_array.size(); i++)
        {
            Document doc = posts_coll.find(new Document("_id", posts_array.get(i))).first();
            array.add(doc);
        }
        return array;
    }

    //find the fresh posts who can still be order
    public static ArrayList<Document> findFreshPosts()
    {
        MongoCollection<Document> posts_coll = db.getCollection("posts");
        Iterator<Document> i = posts_coll.find(new Document("$match", new Document("status", true))).iterator();
        ArrayList<Document> array = new ArrayList<>();
        while(i.hasNext())
        {
            array.add(i.next());
        }

        return array;
    }

    //user make an order, add the user id to the users array in the post
    public static boolean makeOrder(String post_id, String user_id)
    {
        MongoCollection<Document> posts_coll = db.getCollection("posts");
        Document doc = posts_coll.findOneAndUpdate(new Document("_id", post_id),
                                                    new Document("$addToSet", new Document("posts", user_id)));

        ArrayList<String> posts_array = (ArrayList<String>)doc.get("users");
        if(posts_array.size() == doc.getInteger("serving"))
        {
            posts_coll.findOneAndUpdate(new Document("_id", post_id),
                                        new Document("$set", new Document("status", false)));
            return false;
        }
        return true;
    }

}

