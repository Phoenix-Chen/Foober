mongo Foober --eval "db.dropDatabase()"
mongoimport --jsonArray --drop -d Foober -c cooks cooks.json
mongoimport --jsonArray --drop -d Foober -c users users.json
mongoimport --jsonArray --drop -d Foober -c posts posts.json

