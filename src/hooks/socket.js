import socketIOClient from "socket.io-client"

const CONFIG = {
    ws : import.meta.env.VITE_SOCKET_SERVER
}

export default function Socket() {
    const socket = socketIOClient(import.meta.env.VITE_SOCKET_SERVER)

    return socket;
}