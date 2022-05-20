const express = require("express");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const { mnemonicGenerate, cryptoWaitReady } = require("@polkadot/util-crypto");
const { keyring } = require("@polkadot/ui-keyring");
const assert = require("assert");

// Defining a port
const PORT = process.env.PORT || 3001;

// Deining the app
const app = express();

// swagger options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Aleph Zero Accounts",
      version: "1.0.0",
    },
  },
  apis: ["server/index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /:
 *  get:
 *      description: landing API
 *      responses:
 *          200:
 *              description: Success
 */
app.get("/", (req, res) => {
  res.json({
    message:
      "Hey hi! This is the backend. You can use other APIs and build on top of it.",
  });
});

/**
 * @swagger
 *  /test_params:
 *  post:
 *      description: create a default test endpoint
 *      parameters:
 *          - in: query
 *            name: user
 *            schema:
 *              type: string
 *          - in: query
 *            name: password
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: ID or Password not found
 */
app.post("/test_params", (req, res) => {
  // extract ID and password
  const password = req.query.password;
  const username = req.query.user;

  // check for mandatory tests
  try {
    assert(typeof password !== undefined);
    assert(typeof username !== undefined);
    assert(password.length > 7);
    res.json({ message: "Welcome " + username });
  } catch {
    res.status(404).send("Check if ID or Password is not empty");
  }
});

/**
 * @swagger
 *  /generate_mnemonic:
 *  post:
 *      description: create an endpoint to generate the mnemonic
 *      parameters:
 *          - in: query
 *            name: words
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: unsupported word length
 */
app.post("/generate_mnemonic", (req, res) => {
  // generate the mnemonic
  const nWords = parseInt(req.query.words);
  try {
    assert(nWords !== 0);
    assert(nWords === 12 || nWords === 24);
    const mnemonic = mnemonicGenerate(nWords);
    res.json({ mnemonic: mnemonic });
  } catch {
    res.status(404).send("Length of the words can be either 12 or 24");
  }
});

/**
 * @swagger
 *  /generate_address:
 *  post:
 *      description: create a wallet address using the mnemonic, ID and password
 *      parameters:
 *          - in: query
 *            name: accountName
 *            schema:
 *              type: string
 *          - in: query
 *            name: password
 *            schema:
 *              type: string
 *          - in: query
 *            name: mnemonic
 *            schema:
 *              type: json
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: none of the fields should be empty
 */
app.post("/generate_address", (req, res) => {
  // check for account ID, password and mnemonic
  const accoutName = req.query.accountName;
  const password = req.query.password;

  // mnemonic is parsed as a json from the /generate_mnemonic endpoint
  const mnemonic = req.query.mnemonic;

  // sample testing
  console.log(mnemonic, accoutName, password);
  try {
    assert(typeof accoutName !== undefined);
    assert(typeof password !== undefined);
    assert(typeof mnemonic !== undefined);

    // add the account, encrypt the stored JSON with an account-specific password
    const { pair, json } = keyring.addUri(mnemonic, password, {
      name: accoutName,
    });
    res.json({ keystore: json });
  } catch {
    res.status(404).send("check if the input are not empty");
  }
});

cryptoWaitReady().then(() =>
  app.listen(PORT, () => {
    // initialize it with ss58Format 42 for default substrate format (for azero)
    keyring.loadAll({ ss58Format: 42, type: "sr25519" });
    console.log("Server listening to a port");
  })
);
