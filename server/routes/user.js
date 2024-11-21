import express from 'express'
import jwt from 'jsonwebtoken'
import { jwtSecret } from '../server.js'
import { authenticateJWTUser } from '../middlewares/auth.js'
import { User , Listing} from '../db/index.js'
import {hashPassword , compareHash} from '../utils/hashPassword.js'
import sendVerificationEmail from '../utils/nodeMailer.js'

const router = express.Router();

router.post('/auth-check' , authenticateJWTUser , (req,res)=>{
    res.status(200).json({message: 'Authorized' , fname : req.user.fname})
})

router.post('/signup' , async(req,res)=>{
    const userBody = req.body
    let userExist = await User.findOne({email : userBody.email})
    if(userExist) {
        return res.status(404).json({message: "User already exists please login"})
    }
    else{
        try{
            const verificationCode = Math.floor(100000 + Math.random() * 900000);
            const pass = userBody.password
            const expiresAt = Date.now()+ 15*60*1000
            const password = await hashPassword(pass)
            userBody.password = password
            const newUser = {...userBody,  verificationCode : verificationCode, verified: false , verificationCodeExpires : expiresAt}
            const user = new User(newUser)
            await user.save();
            sendVerificationEmail(userBody.email , verificationCode)
            return res.json({message: "User succesfully created , please verifiy "})
        }
        catch(error){
            res.status(500).json({message: "Some error occured"})
        }
    }
})

router.post('/verification' , async(req,res)=>{
    const verifyUser = req.body ;
    try{
        let userExist = await User.findOne({email: verifyUser.email})
        if(userExist){
            const code = parseInt(verifyUser.verificationCode)
            if (userExist.verificationCode === code) {
                if (userExist.verificationCodeExpires < Date.now()) {
                    return res.status(400).json({ message: 'Verification code has expired' });
                }
            await User.findOneAndUpdate({email: verifyUser.email} , 
                {$set : {verified: true ,verificationCode: null , verificationCodeExpires:null}},
                {new: true}
            )
            const token = jwt.sign({email: verifyUser.email , fname: verifyUser.fname || ''} , jwtSecret)
            return res.status(200).json({message: "User verified successfully" , token })
            }else{
                return res.status(400).json({message: "Invalid verification code"})
            }
        }else{
            return res.status(404).json({message: "User not found"})
        }
    }
    catch(error){
        console.error('Error during verification:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

router.post('/login' , async (req,res)=>{
    const userBody = req.body 
    try{
        let userExist = await User.findOne({email: userBody.email})
        if(userExist){
            const hashedPass = userExist.password
            const password = userBody.password 
            let match = await compareHash(password , hashedPass)
            if(match) {
                if(userExist.verified){
                    const token = jwt.sign({email: userBody.email , fname: userExist.fname || ' '} , jwtSecret)
                    return res.json({message: "Logged in successfully" , token})
                }else return res.status(403).json({message: "User not verified"})
            }
            else {
                return res.status(411).json({message: "wrong credentials"})
            }
        }
        else{
            return res.status(404).json({message : "User does not exist"})
        }
    }
    catch(error){
        return res.status(500).json({message: " SOme error occured"})
    }
})

router.get('/listings' , authenticateJWTUser , async (req,res)=>{
    try{
        const {pageNumber = 1 , limit = 10} = req.query
        const listings = await Listing.find().populate('sellerId' , 'fname lname college').skip((pageNumber-1)*limit).limit(limit)
        const totalListings = await Listing.countDocuments();
        if(listings)return res.status(200).json({
            message: "listing retrieved success" ,
            listings ,
            totalListings ,
            pages: (Math.floor(totalListings/limit))
        })
        else return res.status(404).json({message: "Listings not found"})
        }
    catch (error){
        res.status(500).json({message: "Falied to fetch listings"})
    }
})

router.get('/listings/:id' , authenticateJWTUser , async (req,res)=>{
    const listingId = req.params.id
    const listing = await Listing.findById(listingId).populate('sellerId' , 'fname lname college contact')
    if(listing) {
        return res.json({listing})
    }
    else return res.status(404).json({message: 'listing not found'})
})


export default router
