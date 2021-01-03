const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

// Import all function modules
const addToWallet = require("./1_addToWallet");
const { company, manufacturerRegister } = require("./entity-registration");

// Define Express app settings
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set("title", "Drug Counterfeit App");

app.get("/", (req, res) => res.send("hello world"));

app.post("/addToWallet", (req, res) => {
  addToWallet
    .execute(req.body.certificatePath, req.body.privateKeyPath)
    .then(() => {
      console.log("User credentials added to wallet");
      const result = {
        status: "success",
        message: "User credentials added to wallet",
      };
      res.json(result);
    })
    .catch((e) => {
      const result = {
        status: "error",
        message: "Failed",
        error: e,
      };
      res.status(500).send(result);
    });
});

app.post("/manufacturer/registration", (req, res) => {
  manufacturerRegister
    .execute(
      req.body.companyCRN,
      req.body.companyName,
      req.body.location,
      "Manufacturer"
    )
    .then((entity) => {
      console.log("New manufacturer entity created");
      const result = {
        status: "success",
        message: "New manufacturer entity created",
        company: entity,
      };
      res.json(result);
    })
    .catch((e) => {
      const result = {
        status: "error",
        message: "Failed",
        error: e,
      };
      res.status(500).send(result);
    });
});

app.get("/company", (req, res) => {
  company
    .execute(req.body.companyCRN, req.body.companyName)
    .then((entity) => {
      const result = {
        status: "success",
        message: "Company Data",
        company: entity,
      };
      res.json(result);
    })
    .catch((e) => {
      const result = {
        status: "error",
        message: "Failed",
        error: e,
      };
      res.status(500).send(result);
    });
});

app.listen(port, () =>
  console.log(`Distributed Durg Counterfeit App listening on port ${port}!`)
);
