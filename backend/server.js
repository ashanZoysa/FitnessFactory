//-------------------------START OF IMPORTS-----------------------------------
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
//dotenv.config(); not needed
//passport-local and related imports
const passport = require("passport");
const passportLocal = require("passport-local");
const cookieParser = require("cookie-parser");
const session = require("express-session");

//-------------------------START OF MIDDELWARE--------------------------------
app.use(express.json()); //app.use(bodyParser.json()) depreciated
app.use(cors());//cors
app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser("secretcode"))
app.use(passport.initialize());//initialise passport
app.use(passport.session());//initialise passport session
require('./passportConfig')(passport);//require passport config file and pass instance of passport
//-------------------------START OF ROUTES------------------------------------
const userRouter = require("./routes/user");

app.use("/user", userRouter);

const URL = process.env.MONGODB_URL;

//-------------------------START OF DB CONNECTIONS----------------------------
mongoose.connect(URL, {
    useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection success!");
}).on("error", (err) => {
    console.log(err);
});

//-------------------------START SERVER----------------------------------------
const PORT = process.env.PORT || 8070;

app.listen(PORT, () => {
    console.log('Server up and running on port: ' + PORT)
})