import socketio from 'socket.io-client'

const socket = socketio("https://devmappingapi.herokuapp.com", {
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