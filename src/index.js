const express = require("express");
const { MongoClient } = require("mongodb");

const dbMiddleware = require("./middleware/dbMiddleware");

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

app.post("/create", (req, res) => {
  db.collection("bookCollection").insertOne(
    { title: req.body.title, author: req.body.author },
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.post("/create-many", function (req, res) {
  db.collection("bookCollection").insertMany(
    [{ title: "Oh the Places We Will Go!" }, { title: "Diary of Anne Frank" }],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.get("/read", (req, res) => {
  db.collection("bookCollection")
    .find({})
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});
