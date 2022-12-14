const express = require("express");
const { MongoClient } = require("mongodb");

const dbMiddleware = require("./middleware/dbMiddleware");
const routes = require("./routes");

const PORT = 3001;

// creat a new MongoClient using the connection URL and options
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/inventoryDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create express server
const app = express();

// add middleware to express server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// add the connected DB instance to the req object as middleware
app.use(dbMiddleware(mongoClient));
app.use(routes)

const init = async () => {
  try {
    // from the new instance of the client use the connect method to establish a connection
  await mongoClient.connect();
  console.log("[INFO]: Database connection successful");
  // listen on port for express server
  app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
  } catch (error) {
    console.log(`[INFO]: Database connection failed | ${error.message}`);
  }
};

init();
