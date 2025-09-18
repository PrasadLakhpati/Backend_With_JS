import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express() //express() returns functionalities to app; so we can use functionality of express

app.use(cors({
    origin: process.env.CORS_ORIGIN,//it is used to define from where the request will come (from which source address to accept request)
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


//routes import
import userRouter from './routes/user.routes.js'

//routes decleration
app.use("/api/v1/users", userRouter) // whenever any user types /users it will give control to userRouter, then userRouter do further. ***Here we are not using app.get() where we write routes and controller at one place but we are using middleware app.use() method as our routes and middlewares are defined differently 
//url would be like this http://localhost:8000/api/v1/users/register.   
//now suppose if you want to add login method just add route of /login in user.routes.js file, same as we did for /register. 
//now automatically the url will be http://localhost:8000/api/v1/users/login
//therefore, we have not to import anything in this file(app.js)
//only app.use("/api/v1/users", userRouter) is sufficient because whenever user type /api/v1/users the control is sent to userRouter 

export { app }