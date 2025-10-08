const express = require('express');

const mongodb = require('./data/database');
const bodyParser = require('body-parser');

const route = require('./routes/index.js');
//import authRoutes from "./routes/authRoutes.js";
const createAdmin = require("./utils/createAdmin.js");



const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accpt, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

const User = require("./models/User.js");
app.locals.userModel = new User(mongodb);

app.use('/', route)




// Create admin user if not exists
createAdmin(mongodb);


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});