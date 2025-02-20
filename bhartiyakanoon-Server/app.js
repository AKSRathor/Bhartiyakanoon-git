const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
var cors = require('cors') 

const app = express();
// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'PUT', 'POST' , 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
//     credentials: true
// }));


const whitelist = ["https://bhartiyakanoon.vercel.app" ,"http://bhartiyakanoon.vercel.app" , "https://legalvault.vercel.app" ,"http://legalvault.vercel.app"];

// const whitelist = ["https://legalvault.vercel.app" ,"http://legalvault.vercel.app"];
// app.use(cors({
//     origin: (origin , callback)=>{
//         if (whitelist.indexOf(origin) !== -1 || !origin){
//             callback(null , true);
//         }else{
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     methods: ['GET', 'PUT', 'POST' , 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
//     credentials: true
// }));
app.use(cors({
    origin: 'https://bhartiyakanoon.vercel.app',
    methods: ['GET', 'PUT', 'POST' , 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
//Route Imports
const certificate = require("./routes/certificateRoute");
const user = require("./routes/userRoute");
const organisation = require("./routes/organisationRoute");
app.use("/api/v1", certificate);
app.use("/api/v1", user);
app.use("/api/v1", organisation);
// app.use("/api/v1", require("./routes/linkIncRoute"))
//Middleware for error
app.use(errorMiddleware);

module.exports = app
