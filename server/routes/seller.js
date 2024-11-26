import express, { response } from 'express'
import { authenticateJWTUser } from '../middlewares/auth.js'
import { User , Listing} from '../db/index.js'
import { upload } from '../middlewares/multer.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import path from 'path'

const router = express.Router();


router.get('/listings' , authenticateJWTUser , async (req,res)=>{
    const email = req.user.email
    try{
        const user = await User.findOne({email: email}).populate('userListings')
        const listings = user.userListings
        if(!listings) return res.status(404).json({message : 'No listings Created , Create a new one'})
        return res.json(listings)
    }catch(error){
        console.log(error)
    }
})

router.post('/create-listing' , authenticateJWTUser , upload.array('images' , 4) , async (req,res)=>{
    const body = req.body
    const images = req.files
   try{
    const user = await User.findOne({email : req.user.email})
    const sellerId = user._id
    const imagesArray = Array.from(images)
    const cloudResponses = await Promise.all(imagesArray.map((file)=>uploadOnCloudinary(file.path)))
    const imageURls = cloudResponses.map((url)=>url)
    const listing = new Listing({...body , sellerId , images : imageURls})
    await listing.save()
    user.userListings.push(listing._id)
    await user.save();
    return res.json({message: "listing created successfully" , listingId : listing._id})
   }
   catch (error){
    console.log(" in create listing ErROR" + error)
    return res.status(500).json(error)
   }
})

router.put('/listings/:id' , authenticateJWTUser , async(req,res)=>{
  console.log(req.params.id)
    const listingId = req.params.id ;
    const listingUpdate = req.body ;
    const listing = await Listing.findByIdAndUpdate(listingId , listingUpdate , {new : true})
    if(listing) return res.json({message: " listing updated successfully"})
    else return res.status(411).json({message: "listing cannot be updated"})
})

router.delete('/listings/:id', authenticateJWTUser, async (req, res) => {
    const listingId = req.params.id;
    try {
      const listing = await Listing.findById(listingId);
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      await Listing.deleteOne({ _id: listingId });
      return res.status(200).json({ message: "Listing deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });


export default router