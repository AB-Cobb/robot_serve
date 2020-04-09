const express = require('express');
const router = express.Router();
let User = require ('./models/User')
let Log = require('./models/Log')

router.get('/logs',(req,res) => {
    Log.find().exec((error, data) => {
        if (error){
            console.log (error);
            res.status(500).json({ ERROR : error})
        } else {
            res.status(200).json(data);
         }
    })
})
router.post('/adduser', (req,res) => {
    let user = new User({
        username : req.params.username,
        fname : req.params.fname,
        lname : req.params.lname,
        password : req.params.password,
    })
    console.log("adding user : ", user)
    User.create(user, (error, data) => {
        if (error) {
            console.log(error);
            return res.status(500).send();
        } else {
            console.log("adding user : ", data)
            res.status(201).json(data)
        }
    })
});//*/
router.post('/deluser', (req,res) => {
    let username = req.body.username;
    let id = req.body.id; 
    if (username == 'root'){
        return res.status(403).json({ error : 'can not delete root user'});
    }
    User.findByIdAndRemove(id, (error, data) => {
        if (error) {
            console.log(error);
            return res.status(500).send();
        } else {
            res.status(200).json(data)
        }
    })
})
router.post('/updateuser', (req,res) => {
    let user = req.body;
    User.findByIdAndUpdate(user.id, user, (error, data) =>{
        if (error) {
            console.log(error);
            return res.status(500).send();
        } else {
            res.status(200).json(data)
        }
    }) 
})
router.get('/allusers', (req,res) => {
    User.find().exec((error, data) => {
        if (error){
            console.log (error);
            res.status(500).json({ ERROR : error})
        } else {
            res.status(200).json(data);
         }
    })
})
router.post('/login' ,(req,res) => {
    let username = req.body.username;
    let pw = req.body.password; 
    User.findOne({username : username, password : pw}, (error, user) => {
        if (error){
            console.log(error)
            return res.status(500).send();
        }
        if (user){
            res.status(200).json({login : true})
        } else {
            res.status(404).json({login : false})
        }
    })
})

module.exports = router;