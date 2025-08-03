const express = require("express");
require("dotenv").config();
const route = require("./routes/index");

const app = express();
const port = Number(process.env.PORT);

const mongoose = require("mongoose");

app.use(express.json());
app.use("/", route);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Database Error", error);
  });

app.use((err, req, res, next) => {
  const errorMsg = err ? err.toString() : "Something went wrong";
  res.status(500).json({ msg: errorMsg });
});

app.listen(port, () => {
  console.log(`Appilcation is running at port ${port}`);
});
