// Connect to db
  var mongo  = require('mongodb')
  , DB_NAME  = 'mytestimony'
  , Server   = mongo.Server
  , Db       = mongo.Db
  , BSON     = mongo.BSONPure
  , ObjectID = mongo.ObjectID
  , server   = new Server('localhost', 27017, {auto_reconnect: true})
  , db       = new Db(DB_NAME, server, {safe: true})
  ;

// open up connection
db.open(function(err, db) {
    if(!err) { console.log("Connected to "+ DB_NAME + " database"); }
});


module.exports = {

  /**
   * return collection from mongodb 
   * @todo: abstract into db methods so can reuse
   */
  getCollection: function(collName, cb) {
    // 'testimonies' is the name of the collection from the database
    db.collection(collName, function(err, results) {
      if (err) cb(err);
      else cb(null, results);
    });
  }

   /**
    * Gets array of all distinct keys within collection 
    */
  , getDistinct: function(collName, key, cb) {
    this.getCollection(collName, function(err, coll) {
      if (err) cb(err);
      else {
        coll.distinct(key, function(err, results) {
          if (err) cb(err);
          else cb(null, results);
        });
      }
    });  
  }

  /**
   * return all documents from mongodb 
   * @todo: abstract into db methods so can reuse
   */
  , findAll: function(collName, cb) {
    this.getCollection(collName, function(err, collection) {
      if (err) cb(err);
      else {
        collection.find().sort([['date', -1]]).toArray(function(err, results) {
          if (err) cb(err);
          else cb(null, results);
        });
      }
    });
  }

    /**
     * Finds a single item in the collection based on id
     * 
     * @name findOne
     * @param {String} collName - 
     * @param {String} id - BSON ObjectID
     * @param {Function} cb - callback used for error or response process 
     * @returns {Function} - callback 
     * @method 
     * @author Ryan Regalado 
     */
  , findOne: function(collName, id, cb) {
    var obID = new ObjectID(id);

    this.getCollection(collName, function(err, collection) {
      if (err) cb(err);
      else {
         collection.findOne({_id: obID}, function(err, results) {
           if (err) cb(err);
           else cb(null, results);
         });
      }
    });
  }

    /**
     * Inserts document into mongodb
     * 
     * @name insert
     * @param {type} collName - collection name
     * @param {Object} obj - Dcoument to insert
     * @returns void - 
     * @author Ryan Regalado 
     */
  , insert: function(collName, obj, cb) {
    this.getCollection(collName, function(err, collection) {
      if (err) cb(err);
      else {
         var objID = new ObjectID();
         obj._id = objID;
         obj.date = new Date();

         collection.insert(obj, function(err, results) {
           if (err) cb(err);
           else cb(null, results);
         });
      }
    });
  }


};



