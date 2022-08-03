const {MongoClient} = require('mongodb');
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);

var _db;

module.exports = {
    connectToServer:  (callback) => {
        client.connect((err, db) => {
            if (db) {
                _db = db.db("employees");
                console.log("Connected to MongoDB");
            }
            return callback(err);   
        });      
    }, 

    getDb:  () =>{
    return _db;
},
};