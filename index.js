const express = require("express");
const parser = require("body-parser");

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
