const express = require("express");
const parser = require("body-parser");
const mongoose = require("mongoose");
const { name } = require("ejs");
mongoose.set("strictQuery", true);

const app = express();
// var choices = ["Brush Teeth", "Drink Water", "Skincare"];
app.use(parser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, function () {
  console.log("hey i am working on port 3000");
});

app.set("view engine", "ejs");

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

//*  creating model or database

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

const defaults = [t1, t2, t3];

//* Get request

var today = new Date();

app.get("/", (req, res) => {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var day = today.toLocaleDateString("en-US", options);

  todo.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      todo.insertMany(defaults, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Insertion Successful !!");
        }
      });
      res.redirect("/");
    } else {
      res.render("app", { weekday: day, items: foundItems });
    }
    // console.log(foundItems);
  });
});
// });

//* post request

app.post("/", (req, res) => {
  var choice = req.body.pending;

  //* sending the pending data to mongo db database

  var t4 = new todo({
    name: choice,
  });

  t4.save();

  // array.forEach((element) => {});
  // choices.push(choice);
  res.redirect("/");
  // console.log(req);
});

app.post("/about", (req, res) => {
  res.render("about");
});

app.post("/success", (req, res) => {
  res.render("success");
});

// deletion route

app.post("/delete", (req, res) => {
  console.log(req);
});
