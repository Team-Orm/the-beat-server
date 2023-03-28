const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const mongoServer = new MongoMemoryServer();

async function connect() {
  await mongoServer.start();
  const uri = await mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  if (mongoose.connection.readyState) {
    await mongoose.disconnect();
  }

  await require("mongoose").connect(uri, mongooseOpts);
}

async function closeDatabase() {
  await require("mongoose").disconnect();
  await mongoServer.stop();
}

module.exports = { connect, closeDatabase };
