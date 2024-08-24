import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import registerRoute from "./Routes/registerRoute.js"
import loginRoute from "./Routes/loginRoute.js"
import jwtRefresRoute from "./Routes/jwtRefresRoute.js"
import verifyJWT from "./Middleware/verifyJWT.js"
import cookieParser from 'cookie-parser';

const port = 3001

const app = express();
// app.use(cors()); // Enable CORS for all routes

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));


app.use(cookieParser()); // middleware for cookieParser
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
app.use('/register', registerRoute)
app.use('/login', loginRoute)
app.use(verifyJWT)
app.use('/refresh', jwtRefresRoute);

mongoose
  .connect(
    "mongodb+srv://devemresr:IHybYDDzzbfGdcGe@performance-academy.2x7gw.mongodb.net/Performance_Academy?retryWrites=true&w=majority&appName=Performance-Academy"
  )
  .then(() => {
    console.log("connected");
    app.listen(3001, () => {
      console.log("port 3001");
    });
  })
  .catch(() => {
    console.log("didnt connect");
  });


  export default app