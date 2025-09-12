import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req, res) => {
    // res.status(200).json({
    //     message: "chai aur code"
    // })

    //get user details 
    //validation - empty fields
    //check if user alredy exist - email, username
    //check for images, check for avtars
    //upload them to cloudinary, check if avtar is successfully uploaded on clodinary or not 
    //create user objecy, create entry in db
    //remove password and refresh token fields from response 
    //check user for creation
    //return res(response)


    const {fullname, email, username, password} = req.body
    console.log("email", email)

    if(
        [fullname, email, username, password].some((field) => field?.trim() === "") //field?.trim() === "" says if there is filed in array and its empty after trim() then return true 
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [ { username }, { email } ]
    })
    if(existedUser){
        throw new ApiError(409, "User with email or username alredy exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "", //if there is cover image take url otherwise keep it empty 
        email,
        password,
        username: username.toLowercase()
    })
     
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" //- sign removes the fields from selection
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully!!!")
    )
})

export {registerUser,}