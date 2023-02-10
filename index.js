const express = require("express");
const parser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
var choices = ["Brush Teeth", "Drink Water", "Skincare"];
app.use(parser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, function () {
  console.log("hey i am working on port 3000");
});

app.set("view engine", "ejs");

var today = new Date();

app.get("/", (req, res) => {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var day = today.toLocaleDateString("en-US", options);
  res.render("app", { weekday: day, items: choices });
});

app.post("/", (req, res) => {
  var choice = req.body.pending;
  choices.push(choice);
  res.redirect("/");
});

app.post("/about", (req, res) => {
  res.render("about");
});

app.post("/success", (req, res) => {
  res.render("success");
});

//* connecting mongodb to js

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27018/todo");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//* creating the data base and to do using mongodb and mongoose

// creating models and collection using mongoose

//  creating mongoose.Schema

const todo_schema = new mongoose.Schema({
  name: String,
});

//*  creating collection or database

const todo = mongoose.model("todo", todo_schema);

//* creating document inside the collection

const t1 = new todo({
  name: "Brush Teeth",
});
const t2 = new todo({
  name: "Drink Water",
});
const t3 = new todo({
  name: "Do Yoga",
});

// t1.save();
// t2.save();
// t3.save();
