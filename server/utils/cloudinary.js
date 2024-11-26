import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "ddyehcaeo",
  api_key: "288114113742367",
  api_secret: "Q6CC1Y_p8CkxmyGXqY78nI1BoX0",
});

export async function uploadOnCloudinary(localfilepath) {
  try {
    if (!localfilepath) return null;
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "image",
    });
    fs.unlinkSync(localfilepath);
    return response.url;
  } catch (error) {
    console.log("error in upload on cloudinary"+error);
    fs.unlinkSync(localfilepath);
    return error;
  }
}
