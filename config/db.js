import mongoose from "mongoose";
// export bech tnajem tnadeha fi server.js
export const connectDB = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/express-auth').then(() =>console.log('MongoDB Connected'))
   
    .catch(err => console.error('Could not connect to MongoDB...', err));

  
}