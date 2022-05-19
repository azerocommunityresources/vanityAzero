const express = require('express');
const cors = require("cors");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require("swagger-ui-express");

// Defining a port
const PORT = process.env.PORT || 3001;

// Deining the app 
const app = express();

// swagger options
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Aleph Zero Accounts',
            version: '1.0.0'
        }
    },
    apis: ['server/index.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

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
    res.json({message: "Hey hi! This is the backend. You can use other APIs and build on top of it."})
});

/** 
 * create a default test endpoint
 * @param {req} request body from the front end
 * @param {req.query.password} string encrypted password
 * @param {req.query.user} string user name
 */
 app.post("/test_params", (req, res) => {
    const password = req.query.password;
    const username = req.query.user;
    res.json({message: "Welcome "+username});
});


app.listen(PORT, () => {
    console.log('Server listening to a port')
    });
