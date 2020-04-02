const express = require ('express')
const app = express()
server = app.listen(process.env.PORT || 3000)
const io =  require("socket.io")(server)

const db = require ('./db/db')
const Log = require ('./models/Log')

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

app.get ('/api/logs', (req,res) => {
    Log.find().exec((error, data) => {
        if (error){
            console.log (error);
            res.json({ ERROR : error})
        } else {
            res.json(data);
         }
    })
})

app.get ('/', (req, res) => {
    res.render('index')
})


io.on('connection', socket => {
    console.log('conection')
    socket.on('cmd', data => {
        console.log("CMD " + data.drive)
        Log.create()
        io.sockets.emit('cmd', {drive: data.drive})
        io.sockets.emit('ctrl_log', {txt :"command "+ data.drive})
    })
    socket.on("ctrl_log", data => {
        console.log('CTRL Log: ' + data.txt)
        io.sockets.emit('ctrl_log', {txt : data.txt})
        Log.create({sender : 'CTRL', data : data.text}, (error, data) => {
            if (error) {
                console.log(error);
                return
            }
            console.log("adding log ", data)
        })

    })
    socket.on("PI_log", data => {
        console.log('PI Log: ' + data.txt)
        io.sockets.emit('PI_log', {txt : data.txt})
        Log.create({sender : 'PI', data : data.text}, (error, data) => {
            if (error) {
                console.log(error);
                return
            }
            console.log("adding log ", data)
        })
    })
    socket.on("PI_cam", data => {
        io.sockets.emit('PI_log', data)
        console.log("received pi cam data ")
    })
})