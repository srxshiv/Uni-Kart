import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname : String , 
    lname : String ,
    email : String , 
    contact : String ,
    password : String ,
    profileImageLink : String ,
    verified : {
        type: Boolean , 
        default : false
    } ,
    completedOrders : Number ,
    verificationCode : Number ,
    verificationCodeExpires : Date ,
    createdAt : {
        type: Date , 
        default : Date.now
    } ,
    college : String ,
})

const listingSchema = new mongoose.Schema({
    sellerId : {type : mongoose.Schema.Types.ObjectId , ref : 'User' } ,
    name : String ,
    description : String , 
    images : [{type: String}] ,
    price : String ,
    category : String ,
    negotiable : {type: Boolean , default : false} ,
    createadAt : {type : Date , default : Date.now}
})

const User = mongoose.model('User' , userSchema)
const Listing = mongoose.model('Listing' , listingSchema)

export {User , Listing}