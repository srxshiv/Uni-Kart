import express from 'express'
import socketIo from 'socket.io'
import { Messages } from './db'
import cors from 'cors'

const app = express()
const io = socketIo(server)
const port = 5000

app.use(express.json())
app.use(cors())




app.listen(port , ()=>{
    console.log(`message server listening on port ${port}`)
})