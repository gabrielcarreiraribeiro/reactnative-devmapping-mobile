import socketio from 'socket.io-client'

const socket = socketio("http://192.168.0.102:3001", {
    autoConnect: false
})

function subscribeToNewDevs(subscribeFunction) {
    socket.on('new-dev', subscribeFunction)
}

function removeDevFromMap(subscribeFunction) {
    socket.on('remove-dev', subscribeFunction)
}

function updateDevFromMap(subscribeFunction) {
    socket.on('update-dev', subscribeFunction)
}

function connect(latitude, longitude, techs) {

    socket.io.opts.query = {
        latitude,
        longitude,
        techs
    }

    socket.connect()
    // socket.on("message", text => {
    //     console.log(text)
    // })
}

function disconnect() {
    socket.disconnect()
}

export {
    connect,
    disconnect,
    subscribeToNewDevs,
    removeDevFromMap,
    updateDevFromMap
}