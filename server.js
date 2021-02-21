const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const salt = bcrypt.genSaltSync(10);
const knex = require("knex");
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require("./controllers/profile.js");
const image = require("./controllers/image.js");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "tabbathacrouch",
    password: "",
    database: "database",
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => { res.send('success') });

app.post("/signin", signin.handleSignIn(db, bcrypt));

app.post("/register", register.handleRegister(db, bcrypt));

app.get("/profile/:id", profile.handleProfile(db));

app.put("/image", image.handleImage(db));

app.post("/imageUrl", (req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, () => { console.log("app is running on port `${process.env.PORT}`") });
