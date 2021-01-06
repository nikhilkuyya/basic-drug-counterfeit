const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

// Import all function modules
const addToWallet = require("./1_addToWallet");
const {
  company,
  manufacturerRegister,
  distributorRegistration,
  reatilerRegistration,
  transporterRegistration,
  drugRegistration,
} = require("./registration");

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
app.post("/distributor/registration", (req, res) => {
  distributorRegistration
    .execute(
      req.body.companyCRN,
      req.body.companyName,
      req.body.location,
      "Distributor"
    )
    .then((entity) => {
      console.log("New distributor entity created");
      const result = {
        status: "success",
        message: "New distributor entity created",
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
app.post("/retailer/registration", (req, res) => {
  reatilerRegistration
    .execute(
      req.body.companyCRN,
      req.body.companyName,
      req.body.location,
      "Retailer"
    )
    .then((entity) => {
      console.log("New retailer entity created");
      const result = {
        status: "success",
        message: "New retailer entity created",
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

app.post("/transporter/registration", (req, res) => {
  transporterRegistration
    .execute(
      req.body.companyCRN,
      req.body.companyName,
      req.body.location,
      "Transporter"
    )
    .then((entity) => {
      console.log("New transporter entity created");
      const result = {
        status: "success",
        message: "New transporter entity created",
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

app.post("/drug/registration", (req, res) => {
  const body = req.body;
  drugRegistration
    .execute(
      body.drugName,
      body.serialNo,
      body.mfgDate,
      body.expDate,
      body.companyCRN
    )
    .then((drug) => {
      console.log("New Drug Entity created");
      const result = {
        status: "success",
        message: "New Drug entity created",
        data: drug,
      };
      res.json(result);
    })
    .catch((e) => {
      const result = {
        status: "error",
        message: "failed",
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
