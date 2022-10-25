const path = require("path");
const express = require("express");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "a title",
    name: "zush",
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/help", (req, res) => {
  res.render("help");
});
app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "Address must be added as a query string",
    });
  }

  geoCode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forcaset: forecastData,
        location,
        address,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.send("404 page");
});
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
