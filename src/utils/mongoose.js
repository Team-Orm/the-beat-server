const mongoose = require("mongoose");

/**
 **/
function connectMongoDB() {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.SECRET_mongodbID, { useNewUrlParser: true });

  const db = mongoose.connection;

  db.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  db.once("open", () => {
    console.log("MongoDB server connected.");
  });
}

module.exports = connectMongoDB;
