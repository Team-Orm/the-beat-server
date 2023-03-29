const mongoose = require("mongoose");

function connectMongoDB() {
  mongoose.set("strictQuery", false);

  if (process.env.NODE_ENV !== "test") {
    mongoose.connect(process.env.SECRET_MONGODB_ID, { useNewUrlParser: true });
  }

  const db = mongoose.connection;

  db.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  db.once("open", () => {
    console.log("MongoDB server connected.");
  });
}

module.exports = connectMongoDB;
