const express = require("express");
const viewsRouter = require("./views/view.router");
const db = require("./config/db_config");
const morgan = require("morgan");

const PORT = 8000;
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/", viewsRouter);
app.use("/views", viewsRouter);

db.connect();

app.listen(PORT, () => {
  console.log("Server started successfully");
});

// module.exports = app;
