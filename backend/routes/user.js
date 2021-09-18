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
                req.session.user = req.user;
                res.send('Successful login');
                console.log(req.session);
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

//Get users
router.get('/getUser', (req,res) => {
    User.find().exec((err, users) => {
        if(err){
            return res.status(400).json({
                err:err
            });
        }
        return res.status(200).json({
            success: true,
            existingUsers: users
        })
    })
})

//update users
router.put('/updateUserLevel/:id', (req, res) => {
    const accl = Number(req.body.accLevel);

    User.findByIdAndUpdate(req.params.id, { accLevel: accl}, (err, docs) => {
        if (err){
            console.log(err);
            res.json("Update unsccessful")
        }
        else{
            res.json(docs)
        }
    } 
    
    )
})

//delete users
router.delete('/deleteUser/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, deletedUser)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                message: 'Delete unsuccessful', err
            })
        }
        else{
            return res.status(400).json({
                message: 'Delete successful', deletedUser
            })
        }
    })
})

//to check if authenticated
/*function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return res.redirect('/homePage');
    }
    next();
}*/

module.exports = router;

