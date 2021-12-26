const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let isConnected;
let mongo_url = process.env.MONGODB_URI;

module.exports = connectToDatabase = () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }

  console.log("=> using new database connection");
  return mongoose.connect(mongo_url, {useNewUrlParser: true, useUnifiedTopology: true}).then(db => {
    isConnected = db.connections[0].readyState;
  });
};
