
const express = require("express")
const cors = require("cors")
const app = express()
const socket = require("socket.io")

app.use(cors())
require("./config/mongoose.config")
app.use(express.json(), express.urlencoded({extended:true}))
require("./routes/pet.routes")(app)

const server = app.listen(8000, () => console.log("The server is all fired up on port 8000"))

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST","PUT","DELETE"],
        allowedHeaders: ["*"],
        credentials: true
    }
})

io.on("connection", socket => {
    socket.on("change_made_in_pet_list", data => {
        socket.broadcast.emit("receive_new_pet_list", data)
    })
})

