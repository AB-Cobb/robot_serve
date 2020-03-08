const express = require ('express')
const app = express()
server = app.listen(process.env.PORT || 3000)
const io =  require("socket.io")(server)

app.set ('view engine', 'ejs')

app.use (express.static('public'))

app.get ('/', (req, res) => {
    res.render('index')
})

io.on('connection', socket => {
    console.log('conection')
    socket.on('cmd', data => {
        console.log("CMD " + data.drive)
        io.sockets.emit('cmd', data.drive)
    })
    socket.on("PI_log", data => {
        io.sockets.emit('PI_log', data.text)
    })
})