import express from 'express' 
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './routes/user.js'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json())

app.use('/user/' , userRouter)

const port = process.env.PORT 
const jwtSecret = process.env.JWT_Secret
const baseURL = process.env.base_URL
const dbURL = process.env.db_URL

mongoose.connect(dbURL)

app.listen(port , ()=>{
    console.log(`server listening on port ${port}`)
})

export {port , jwtSecret ,baseURL ,dbURL}

