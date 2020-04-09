const express = require ('express')
const app = express()
server = app.listen(process.env.PORT || 3000)
const io =  require("socket.io")(server)
const mongoose = require('mongoose')

const router = require('./router')
const db = require ('./db/db')
const Log = require ('./models/Log')

const User = require ('./models/User')
const Log = require('./models/Log')

//testing
mongoose.connect(db.db, {
    useNewUrlParser: true
  }).then(() => {
      console.log('Database connected')
    },
    error => {
      console.log('Could not connect to DB: ' + error)
    }
  )


app.set ('view engine', 'ejs')

app.use (express.static('public'))

app.use('/api', router)

app.get ('/', (req, res) => {
    res.render('index')
})

io.on('connection', socket => {
    console.log('conection')
    
    //Pi Commands
    socket.on('cmd', data => {
        console.log("CMD " + data.drive)
        io.sockets.emit('cmd', {drive: data.drive})
        io.sockets.emit('ctrl_log', {txt :"command "+ data.drive})
        //Logging
        Log.create({source : data.source, username : data.username, data : "COMMAND = "+data.drive}, (error, data) => {
            if (error) {
                console.log(error);
                return
            }
            console.log("adding log ", data)
        })
    })
    /*
    //Logging
    socket.on("ctrl_log", data => {
        console.log('CTRL Log: ' + data.txt)
        io.sockets.emit('ctrl_log', {txt : data.txt})
        Log.create({source : data.source, username : data.username ,data : data.text}, (error, data) => {
            if (error) {
                console.log(error);
                return
            }
            console.log("adding log ", data)
        })

    })*/
    socket.on("PI_log", data => {
        console.log('PI Log: ' + data.txt)
        io.sockets.emit('PI_log', {txt : data.txt})
        Log.create({source : 'PI', user : 'pi_driver' , data : data.text}, (error, data) => {
            if (error) {
                console.log(error);
                return
            }
            console.log("adding log ", data)
        })
    })
})