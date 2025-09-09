import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express() //express() returns functionalities to app; so we can use functionality of express

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true //explore more with ctrl+space
})) // app.use() used for the setting up middleware or configurations

//accepting json 
app.use(express.json({
    limit: "16kb"
    // explore more 
})) 

//accepting url, we are bound to do this because url converts the information such as it converts space to %20
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

//for storing files, pdf, images and more locally in specified folder : here folder is "public"
app.use(express.static("public"))

// We are using cookie parser to access and set secure browser cookies (we can perform CRUD operation on cookie)
// we are using cookieParser for accessing cookie of user browser from our server as only server can only access secure cookie
app.use(cookieParser()) 




export { app }