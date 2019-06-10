const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for EXPRESS config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Vincenzo Pellegrini"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Vincenzo Pellegrini"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is a help message",
    name: "Vincenzo Pellegrini"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address matching"
    });
  }
  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({
        error: err
      });
    }
    forecast(latitude, longitude, (error, data) => {
      console.log(data);
      res.send({
        forecast: data,
        location,
        address: req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);
  res.send({
    product: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    name: "Vincenzo",
    message: "Help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    name: "Vincenzo",
    message: "Page not found"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
