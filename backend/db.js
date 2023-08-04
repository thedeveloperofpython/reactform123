const mongoose = require("mongoose");

const dbURI = `mongodb+srv://sricharanponna0007:SwaCha725&"%@responses.zw4efmo.mongodb.net/`; // Replace with your MongoDB URI

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB!");
});

module.exports = db;
