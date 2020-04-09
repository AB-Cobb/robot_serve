const express = require('express');
const router = express.Router();
const User = require ('./models/User')

router.get('logs',(req,res) => {
    Log.find().exec((error, data) => {
        if (error){
            console.log (error);
            res.json({ ERROR : error})
        } else {
            res.json(data);
         }
    })
})
router.post('/adduser', (req,res) => {
    User.create(req.body, (error, data) => {
        if (error) {
            console.log(error);
            return res.status(500).send();
        } else {
            res.status(201).json(data)
        }
    })
})
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
    User.find().populate('username','fname','lname')
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