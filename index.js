const express = require("express");
// Set the port
const port = process.env.PORT || 5005;
const cors = require("cors");

const notionRouter = require("./routes/notion");

// Initialize express

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/notion", notionRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Catch-all endpoint
app.get("*", (req, res) => {
  res.send("Error 404, Page not found!");
});
// Export the Express API
module.exports = app;
