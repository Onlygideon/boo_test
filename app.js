"use strict";

const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = express();
const port = process.env.PORT || 3000;

const mongoServer = new MongoMemoryServer();

mongoServer.getUri("boo").then((mongoUri) => {
  mongoose.connect(mongoUri, {});
  console.log("connected to DB");
});

app.use(express.json());

// set the view engine to ejs
app.set("view engine", "ejs");

// base url route
app.get("/", async (req, res) => {
  res.json({ message: "Welcome to Boo API" });
});

// routes
app.use("/profile", require("./routes/profile")());
app.use("/user", require("./routes/user")());
app.use("/comment", require("./routes/comment")());

// start server
const server = app.listen(port);
console.log("Server started. Listening on %s", port);

module.exports = app;
