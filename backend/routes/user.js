const router = require("express").Router();
let User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const e = require("express");

//createUserAccount
router.route("/createUserAccount").post( async (req,res) => {

    const username = req.body.username;
    var password = req.body.password;
    const accType = req.body.accType;
    const accLevel = Number(req.body.accLevel);

    password = await bcrypt.hashSync(password, 10);

    const newUser = new User({
        username,
        password,
        accType,
        accLevel
    })

    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) {
            console.log(err)
        }
        else if (doc) {
            res.json("User already exists")
        }
        else{
            newUser.save().then(() => {
                res.json("User account created")
            }).catch((err) => {
                console.log(err);
            })
        }
    })
})

//User login
router.route("/login").post( (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) console.log(err);
        else if (!user){
            res.send("No user exists");
        }
        else if (user){
            req.login(user, err => {
                if(err) console.log(err);
                res.send('Successful login');
                console.log(req.user.toObject().accLevel);
            })
        }
    })(req, res, next)//don't know why
})

//logout
router.route('/logout').delete( (req, res, next) => {
    req.logout()    
    res.send('Successful log out');
})

//to check if authenticated
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return res.redirect('/homePage')
    }
    next()
}

module.exports = router;

