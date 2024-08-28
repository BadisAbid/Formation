import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import formationRouter from './routes/formationRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config.js';



// app config
//intialize the app
const app = express();
const port = 4000;


// middleware
//intialize the middleware
// win kol bech ne5thou  request min 3and frontend lel backend bech tkoun 3abra el json
app.use(express.json());
//bech najmou noslou lel backend min ay frontend 
app.use(cors());
// request the dat mil server
//lazemna path win n7ebbou n5admouh



//db connection
connectDB();

// api endpoints bech na3mlou api lel formationRoute
app.use("/api/formation",formationRouter);

//lenna bech nroddo el taswira tothher fil frontend
app.use("/images",express.static('uploads'));

//user
app.use ("/api/user", userRouter);


app.get("/",(req,res)=>{
    res.send("API working");
})

//run express server
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
})