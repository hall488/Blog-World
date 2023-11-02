const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");
const articlesRouter = require("./routes/articles");
const categoriesRouter = require("./routes/categories");

const app = express();

app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);
app.use("/articles", articlesRouter);
app.use("/categories", categoriesRouter);

app.listen(5000, () => {
  console.log("Blog World listening on port 5000!");
});
