const express = require("express");
const parser = require("body-parser");
const mongoose = require("mongoose");
const name = require("ejs");
const axios = require("axios");
// const ObjectID = require("mongodb").ObjectID;
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
  // await mongoose.connect("mongodb://127.0.0.1:27018/weather");
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
const weather = mongoose.model("weather", weather_schema);

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

axios
  .get(
    "https://api.openweathermap.org/data/2.5/weather?lat=30.748882&lon=76.641357&appid=4850b25330e03671839805f08fc6e6c0&units=metric"
  )
  .then((response) => {
    weather.count(function (err, count) {
      if (!err && count === 0) {
        const weather_data = new weather({
          name: response.data.name,
          temperature: response.data.main.temp,
        });
        weather_data.save();
        console.log("insertion Successfull ");
      }

      //!updateone method is not working

      weather.updateOne({ name: "Kharar" }, { $set: { temperature: 102 } });

      console.log("everything is successfull !! ");
      // console.log(weather.weather_data);
      // console.log(response);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  // time data to render

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
      res.render("app", {
        weekday: day,
        items: foundItems,
        city_name: "Kharar",
        temperature: 100,
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
  console.log(req.body);
});
