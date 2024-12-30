const express = require('express') //imports express.js
const app = express() //creates an expressa application
const http = require('http') // needed for http server and client
const server = http.createServer(app) //creates a local server
const cors = require('cors')
//-------Importing and initializing socket.io--------
const { Server } = require('socket.io')



//CORS configuration for express and socket.io in that order
app.use(cors({
    origin: 'http://localhost:5173'
}))

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
})



//Socket.IO connections and event listneners
io.on('connection', (socket) => {
    console.log('User connected with an ID of', socket.id)

    socket.on('sending', (message) => {
        newMessage = {...message, style:'recieving'}

        socket.broadcast.emit('recieving', newMessage)
    })
})


// Let the user know the server is working
const PORT  = 3000
server.listen(3000, ()=> {
    console.log(`Running on http://localhost:${PORT}`)
})