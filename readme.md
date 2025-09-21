#in this serise we are gonna learn backend from chai aur code yt channel 
-[Model Link](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj?origin=sharegi)

node -v
npm init
git init
git add .
git commit -m "adding initial files for backend"
git branch -M main
git remote add origin https://github.com/PrasadLakhpati/ChaiAurBackend-JS.git 
git push -u origin main
git status - checking for empty folder public/temp
git status - after adding .gitkeep file in /temp folder
cd src
echo app.js, constants.js, index.js
cd..
npm i -D nodemon
git status 
git add .
git commit -m "project setup file - part 1"
git push
ls

cd src
mkdir controllers, db, middlewares, models, routes, utils
npm i -D prettier

npm i cookie-parser cors




What is asyncHandler?
asyncHandler is a higher-order function.
A higher-order function is a function that takes another function as an argument and possibly returns a new function.

Why is asyncHandler needed?
In Express.js, if an asynchronous function throws an error, you need to explicitly pass that error to the next function for the Express error-handling middleware to catch it. Without this, your server might crash or not handle the error properly.

Different Variations 

Version 1: The normal function
const asyncHandler = () => {};
This is a simple function 

Version 2: The higher-order function
const asyncHandler = (func) => {
  return () => {};
};
Takes a function (func) as an argument.
Returns a new function.

Version 3: The higher-order async function
const asyncHandler = (func) => {
  return async () => {};
};
Same as above, but the returned function is asynchronous (async).
Used when the inner function (func) involves asynchronous operations.



npm i mongoose-aggregate-paginate-v2 - this library is used for generation of aggregation pipelines . We use plugin hook to aggrigate it


npm i bcrypt jsonwebtoken

bcrypt - bcrypt is a package used to manage passwords such as encryption, descryption, hashing and more (we can also use bcryptjs for it). Direct encryption and decryption of passwords are imossible; therefore we need to take help of hooks(middleware) such as --pre-- hook

jsonwebtoken - jsonwebtoken is a library in java script used for 




npm i cloudinary - we are using cloudinary storing and accessing files in efficient manner 

npm i multer - multer is used for managing files, pdfs, images 

** With the help of multer we will take file from user and store it on the local servre and with the help of clodinary we will take thoes files from local server and upload it to the server **


AccessToken and RefreshToken -----> suppose user logs in and is allowed logged in for 15 min minutes(access token) only but he is uploading file on server but his 15 minutes session ends. Therefore here the concept of AccessToken and RereshToken comes which solves this problem as follows 
    1 = RefreshToken is stored at both user and server side 
    2 = when AccessToken is timeout 
    3 = it checks if the RefreshToken at user and server is matched or not 
    4 = if RefreshTokens are matched it generates new AccessToken for user 