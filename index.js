const io = require("socket.io")(process.env.PORT || 8080, {
    cors: {
        origin : "*"
    }
})

const rooms = []

io.on('connection', socket => {
    socket.on('doctor-joined', (peerId, user, cb)=> {
        
        rooms.forEach((room, ind) => {
            if (room.id == user.id) {
                cb("Already in a session. Previous Session Logged Out!")
                rooms.splice(ind, 1)
            }
        })

        cb("Success")

        user.peerId = peerId
        rooms.push(user)

        socket.broadcast.emit('doctor-list', rooms)
        console.log(rooms);
    })

    socket.on("doctor-left", (id)=> {

        for (let i=0; i<rooms.length; i++) {
            if (rooms[i].peerId == id) {
                rooms.splice(i, 1)
                break
            }
        }

        socket.broadcast.emit('doctor-list', rooms);
        console.log(rooms);
    })

    // Initial data fetching...
    socket.on('get-rooms', (cb)=> {
        cb(rooms);
    })
})