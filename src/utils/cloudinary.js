import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()

// cloudinary.config()
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        // console.log("before checking local path in uploadOnCloudinary")
        // console.log("local file path is ", localFilePath)
        if (!localFilePath) return null
        //upload the file on cloudinary
        // console.log("before uploading file on cloudinary")
        // console.log("cloudinary configurations : ",cloudinary.config())
        const response = await cloudinary.uploader.upload(localFilePath);
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath) // remove the locally saved temporarily saved file as the file is successfully uploaded on cloudinary
        return response;

    } catch (error) {
        // console.log("its error in catch of upload on cloudinary")
        // console.log("the error is ", error)
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export {uploadOnCloudinary}