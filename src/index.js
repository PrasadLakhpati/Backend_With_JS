import connectDB from './db/index.js';
import dotenv from 'dotenv';
import { app } from './app.js'

dotenv.config();


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("MONGO DB connection error !!!", error)
})// read about nodejs api errors 


/*import express from 'express'
const app = express()

;(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error", (error)=>{
            console.log(error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`app is listining on port : ${process.env.PORT}`);
        })

    } catch (error) {
        console.log(error)
        throw error
    } 
})()
*/