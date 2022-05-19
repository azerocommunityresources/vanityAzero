const express = require('express');
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const docs = require('../docs');

// Defining a port
const PORT = process.env.PORT || 3001;

// Deining the app 
const app = express();
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));

app.listen(PORT, () => {
    console.log('Server listening to a port')
    });
