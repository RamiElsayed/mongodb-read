const getAllData = (req, res) => {
  try {
    req.db
      .collection("bookCollection")
      .find({})
      .toArray((err, results) => {
        if (!err) {
          return res.json({ success: true, data: results });
        }
        throw new Error("Failed to get data from DB");
      });
  } catch (error) {
    console.log(`[ERROR]: Failed to get all books| ${error.message}`);
  }
};
const createData = async (req, res) => {
  const { title, author } = req.body;
  try {
    const data = await req.db
      .collection("bookCollection")
      .insertOne({ title, author });
    return res.json({ success: true, data });
  } catch (error) {
    console.log(`[ERROR]: Failed to create new data| ${error.message}`);
  }
};
const createBulkData = async (req, res) => {
  const books = [
    { title: "Oh the Places We Will Go!" },
    { title: "Diary of Anne Frank" },
  ];
  try {
    const data = await req.db.collection("bookCollection").insertMany(books);
    return res.json({ success: true, data });
  } catch (error) {}
  console.log(`[ERROR]: Failed to add many books | ${error.message}`);
};

module.exports = {
  getAllData,
  createData,
  createBulkData,
};
