const express = require("express");
const app = express();

const christmas = require("./christmas.json");
// we initialise a variable that has for value our json

app.get("/", (req, res) => {
  if (!req.query.arrdt || isNaN(req.query.arrdt)) {
    // You would have an error for this one because the query names have nothing in common

    // If no value was provided during the query or that the value provided wasn't a number.
    // Then we respond to our user with : "You must provide a district number"

    res.json({ message: "You must provide a district number" });
  } else if (Number(req.query.arrdt) > 20) {
    res.json({ message: "This district does not exist" });
  } else {
    // we store the results in an array

    let results = [];

    // We loop over the full length (all the values) of our json tab christmas
    for (let i = 0; i < christmas.length; i++) {
      // si l'arrondissement présent dans le tableau et égal à l'arrondissement envoyé en query

      if (christmas[i].fields.arrdt === Number(req.query.arrdt)) {
        // if the value at current index in our json is equal to the numbers value made by the user during his query
        // we push the following values in each key
        results.push({
          garden: christmas[i].fields.jardin,
          address: christmas[i].fields.adresse,
          arrdt: christmas[i].fields.arrdt,
        });
      }
    }
    // The server then answers the client once we looped over the full json
    res.json(results);
  }
});
app.listen(3000, () => {
  console.log("Server has started");
});
