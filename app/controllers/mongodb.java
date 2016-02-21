package controllers;

import com.mongodb.*;

/**
 * Created by phoenixchen on 2/20/16.
 */
public class mongodb {
    public static void main(String args[]){
        MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
        DB db = mongoClient.getDB( "mydb" );

    }
}
