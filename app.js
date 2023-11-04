require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const articlesRouter = require("./routes/articles");
const categoriesRouter = require("./routes/categories");

mongoose.set("strictQuery", false);
const mongoDB = `mongodb+srv://hall488:${process.env.SECRET_KEY}j@cluster0.dh0zviq.mongodb.net/blog_world?retryWrites=true&w=majority`;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/articles", articlesRouter);
app.use("/categories", categoriesRouter);

app.listen(5000, () => {
  console.log("Blog World listening on port 5000!");
});
