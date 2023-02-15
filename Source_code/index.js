const express = require("express");
const parser = require("body-parser");
const mongoose = require("mongoose");
const name = require("ejs");
const axios = require("axios");
const { getCurrentPosition } = require("geolocation");
const favicon = require("serve-favicon");
const path = require("path");
const navigator = require("navigator");
const { request } = require("http");
const app = express();
mongoose.set("strictQuery", true);

// var choices = ["Brush Teeth", "Drink Water", "Skincare"];
app.use(parser.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(favicon(path.join(__dirname, "public", "images/favicon.ico")));

app.listen(3000, function () {
  console.log("hey i am working on port 3000");
});

// navigator.geolocation.getCurrentPosition((position) => {
//   doSomething(position.coords.latitude, position.coords.longitude);
// });

app.set("view engine", "ejs");

//* connecting mongodb to js

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://gourav:helloworld123@cluster0.koe22yf.mongodb.net/todo"
  );
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//* creating the data base and to do using mongodb and mongoose

// creating models and collection using mongoose

//  creating mongoose.Schema

const todo_schema = new mongoose.Schema({
  name: String,
});

const weather_schema = new mongoose.Schema({
  name: String,
  temperature: Number,
});

//*  creating model or database

const todo = mongoose.model("todo", todo_schema);
// const weather = mongoose.model("weather", weather_schema);

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

// creating documents inside the weather collections

//* Get request

var today = new Date();

//* making the api call openweather

// axios;
// axios

// console.log(geolocation.getCurrentPosition());
app.get("/", (req, res) => {
  var options = {
    weekday: "long",
    // year: "numeric",
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
      axios
        .get(
          "https://api.openweathermap.org/data/2.5/weather?lat=30.748882&lon=76.641357&appid=4850b25330e03671839805f08fc6e6c0&units=metric"
        )
        .then((response) => {
          const wthr = [];
          wthr.push(response.data.main.temp);
          wthr.push(response.data.name);
          wthr.push(response.data.cod);
          res.render("app", {
            weekday: day,
            items: foundItems,
            city_name: wthr[0],
            temperature: wthr[1],
            status_code: wthr[2],
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
});

//* post request
app.post("/", (req, res) => {
  var choice = req.body.pending;

  //* sending the pending data to mongo db database

  var t4 = new todo({
    name: choice,
  });

  t4.save();
  // making the redirect request

  res.redirect("back");
});

app.post("/about", (req, res) => {
  res.render("about");
});

app.post("/success", (req, res) => {
  res.render("success");
});
// deletion route

app.post("/delete", (req, res) => {
  console.log(req.body);
});

// console.log(getCurrentPosition());
