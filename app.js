const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

var workItems = [];
var items = ["Buy Food", "Cook Food", "Eat Food"];

app.get("/", function (req, res) {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", { listTitle: day, newListItem: items });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  console.log(req.body)
  if (req.body.list === "Work") {
    if (item.length > 2) workItems.push(item);
    res.redirect("/work");
  } else {
    if (item.length > 2) items.push(item);
    res.redirect("/");
  }
});

app.get("/about", function (req, res) {
    res.render("about")
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work list ", newListItem: workItems });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
