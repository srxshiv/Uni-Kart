import express from 'express' 
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './routes/user.js'
import dotenv from 'dotenv'
import sellerRouter from './routes/seller.js'
import http from 'http'
import {Server} from 'socket.io'
import { Messages , User} from './db/index.js'

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json())
const server = http.createServer(app)

app.use('/user' , userRouter)
app.use('/seller' , sellerRouter)

const port = process.env.PORT 
const jwtSecret = process.env.JWT_Secret
const baseURL = process.env.base_URL
const dbURL = process.env.db_URL

mongoose.connect(dbURL)

server.listen(port , ()=>{
    console.log(`server listening on port ${port}`)
})

//io 

const io = new Server(server , {
    cors :{
        origin : "*" ,
        methods : ["GET" , "POST"]
    }
})


io.on('connection' , (socket)=>{
    socket.on('join-room' , ({buyerId, sellerId})=>{
        const room = buyerId < sellerId ? buyerId+sellerId : sellerId+buyerId;
        console.log("reciever id in socket " + sellerId)
        console.log("buyer id in socket " + buyerId)
        socket.join(room)
    })

    socket.on('send-message' , async ({senderId , receiverId ,content})=>{

        const room = senderId < receiverId ? senderId+receiverId : receiverId+senderId
        const newMessage = new Messages({
            senderId ,
            receiverId ,
            content
        })
        await newMessage.save();

        const user1 = await User.findById(senderId).populate('conversations' , '_id')

        const user2 = await User.findById(receiverId).populate('conversations' , '_id')

        if (!user1 || !user2) {
            console.error('User not found for given IDs');
            return;
          }

        if(!user2.conversations.some((conv)=> conv._id.toString() === senderId)){
            user2.conversations.push(user1)
            await user2.save();
        }
        if(!user1.conversations.some((conv)=> conv._id.toString() === receiverId)){
            user1.conversations.push(user2)
            await user1.save();
        }

        socket.to(room).emit('receive-message' , {
            senderId ,
            receiverId ,
            content 
        })
    })

    socket.on('disconnect' , ()=>[
    ])
})

export {port , jwtSecret ,baseURL ,dbURL , server}

