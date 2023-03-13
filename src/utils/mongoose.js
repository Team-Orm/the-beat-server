const mongoose = require("mongoose");

/**
 * Connects to MongoDB using the provided URI and sets the "strictQuery" option to false.
 * @function
 * @return {void}
 */
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
