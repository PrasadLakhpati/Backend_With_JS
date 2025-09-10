import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function(next){ //here we are not using arrow function as callback function because arrow function doesn't hold reference of this. Here this holds the reference of userSchema 
    if(!this.isModified("password")) return next(); //if the password is not modified then we will return because we don't want to unnecessery updaations of password 

    this.password = bcrypt.hash(this.password, 10) //Here we are encrypting the password of user using hash() of bcrypt library because password is confidential
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) { //mongoose allows us to insert user defined middleware methods to use. We can insert this methods using Schema.methods.functionName = function () {}
    return await bcrypt.compare(password , this.password ) //.compare method returns true if plain pass and encrypted password is matched, otherwise it returns false
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign( // jwt.sign is used to return a token or generate a token
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            password: this.password
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIN: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () { // Refresh token do same work as the Access token but it returns the less information as refreshed again and again and it is expired after a long time 
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIN: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)