const { MongoClient } = require("mongodb");

// const connectionString = process.env.ATLAS_URI;
const connectionString = 'mongodb+srv://allans:asr130690xx@cluster0.9tnnh.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

const connectToServer = (callback) => {
  client.connect(function (err, db) {
    if (err || !db) {
      return callback(err);
    }

    dbConnection = db.db("telegraphs");
    console.log("Successfully connected to MongoDB.");

    return callback();
  });
}

const getDb = () => {
  return dbConnection;
}



module.exports = {
  connectToServer,
  getDb
};

