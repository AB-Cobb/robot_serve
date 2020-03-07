$(function(){
    const socket = io.connect()
    
    // Input / output
    var pi_logs = $("#logs")
    var btn_fwd = $("#FWD")
    var btn_lft = $("#LFT")
    var btn_bck = $("#BCK")
    var btn_rght = $("#RGHT")

    socket.on ("PI_log", data => {
        pi_logs.append("<p>" +data.txt+"</p>")
    })

    btn_fwd.click(function(){
        pi_logs.append('<p> FWD</p>')
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
        socket.emit("cmd", {drive : "fwdbck"})
    })
    btn_bck.mouseup(function(){
        socket.emit("cmd", {drive : "stop"})
    })
})