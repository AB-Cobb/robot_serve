$(function(){
    console.log("hello world")
    const socket = io.connect(/*'localhost:3000'*/)
    //const stream = ss.createStream();
    // Input / output
    var logs = $("#logs")
    var btn_fwd = $("#FWD")
    var btn_lft = $("#LFT")
    var btn_bck = $("#BCK")
    var btn_rght = $("#RGHT")
    var pi_cam = $("#picam")

    socket.on('cam_image', data => {
        pi_cam.src = data;
        console.log('pi cam data', data);
    })
    socket.on ("PI_log", data => {
        logs.append("<p>PI: " +data.txt+"</p>")
    })
    socket.on ("ctrl_log", data => {
        logs.append("<p>CTRL:" +data.txt+"</p>")
    })

    btn_fwd.mousedown(function(){
        socket.emit("cmd", {drive : "fwd"})
    })
    btn_fwd.mouseup(function(){
        socket.emit("cmd", {drive : "stop"})
    })

    btn_lft.mousedown(function(){
        socket.emit("cmd", {drive : "lft"})
    })
    btn_lft.mouseup(function(){
        socket.emit("cmd", {drive : "stop"})
    })

    btn_rght.mousedown(function(){
        socket.emit("cmd", {drive : "rght"})
    })
    btn_rght.mouseup(function(){
        socket.emit("cmd", {drive : "stop"})
    })

    btn_bck.mousedown(function(){
        socket.emit("cmd", {drive : "bck"})
    })
    btn_bck.mouseup(function(){
        socket.emit("cmd", {drive : "stop"})
    })
})