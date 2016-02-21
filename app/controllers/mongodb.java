package controllers;
/**
 * Created by JASON on 2/20/16.
 */
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.json.*;
import org.bson.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class mongodb
{
    static MongoClient mongoClient = new MongoClient("localhost", 27017);
    static MongoDatabase db = mongoClient.getDatabase("Foober");


    public static void main(String args[]) {
        MongoClient mongoClient = new MongoClient("localhost", 27017); //Exception

        db = mongoClient.getDatabase("Foober");

        for (String name: db.listCollectionNames()) {
            System.out.println("Collection Name: " + name);
            MongoCollection<Document> coll = db.getCollection(name);
            System.out.println("# of Data in Collection: " + coll.count());
        }

        System.out.println("demonstrating find(collection, id)");
        System.out.println(find("users", "56c95f31dbe73c089dbdc992"));
        System.out.println("###########");

        System.out.println("demonstrating find(collection)");
        Iterator<Document> i = find("users").iterator();
        while(i.hasNext())
        {
            System.out.println(i.next().toJson());
        }
        System.out.println("###########");

        System.out.println("demonstrating findPosts(cook_id)");
        Iterator<Document> iterator = findPosts("56c94e8445b863f3bafd3c09").iterator();
        while(iterator.hasNext())
        {
            System.out.println(iterator.next().toJson());
        }
        System.out.println("###########");
    }

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
        ArrayList<Document> array = new ArrayList<>();

        MongoCollection<Document> coll = db.getCollection(collection);
        long size = coll.count();
        Iterator<Document> i = coll.find().iterator();
        for (int j = 0; i.hasNext(); j++)
        {
            if(j == (3 * (size / 3)))
                break;
            array.add(i.next());
        }

        System.out.println("size:" + array.size());

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
        FindIterable<Document> iterable = posts_coll.find(new Document(new Document("status", "true")));
        Iterator<Document> i = iterable.iterator();
        ArrayList<Document> array = new ArrayList<>();
        while(i.hasNext())
        {
            array.add(i.next());
        }

        return array;
    }

    public static ArrayList<Document> getPosts(String condition, String cook_id)
    {
        ArrayList<Document> array = new ArrayList<>();
        ArrayList<String> posts_array;
        String status;

        MongoCollection<Document> cooks_coll = db.getCollection("cooks");
        MongoCollection<Document> posts_coll = db.getCollection("posts");

        if (condition.equals("fresh"))
            status = "true";
        else
            status = "false";

        //find a specific cook
        Document cook = cooks_coll.find(new Document("_id", cook_id)).first();
        posts_array = (ArrayList<String>)cook.get("posts");

        for (int i = 0; i < 3 * ((posts_array.size() + 1) % 3); i++)
        {
            Document doc = posts_coll.find(new Document("_id", posts_array.get(posts_array.size() - i - 1))).first();
            if(doc.getString("status").equals(status))
                array.add(doc);
        }
        return array;
    }

    //user make an order, add the user id to the users array in the post
    public static String addPost(String cook_id, String json)
    {
        Document cook;
        MongoCollection<Document> posts_coll = db.getCollection("posts");
        MongoCollection<Document> cooks_coll = db.getCollection("cooks");
        JSONObject obj = new JSONObject(json);
        String ingradient = (String)obj.get("ingradient");
        String[] ary = ingradient.split(", ");
        List<String> ing_array = new ArrayList<>();
        List<String> posts_array = new ArrayList<>();

        for (String s : ary)
        {
            ing_array.add(s);
        }

        try
        {
            Document doc = new Document("title", obj.getString("title"))
                    .append("serving", obj.getInt("serving"))
                    .append("description", obj.getString("description"))
                    .append("ingradient", ing_array)
                    .append("cook_id", cook_id);

            cook = cooks_coll.find(new Document("_id", cook_id)).first();
            String posts = cook.getString("ingradient");
            ary = posts.split(", ");
            for (String s : ary)
            {
                posts_array.add(s);
            }

            posts_coll.insertOne(doc);
            cooks_coll.updateOne(new Document("_id", cook_id), new Document("posts", posts_array));
            return "success";
        }
        catch (Exception e) {
            return "failure";
        }
    }

}

