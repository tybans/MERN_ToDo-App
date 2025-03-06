import mongoose from "mongoose";
require('dotenv').config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');  
  }
  catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}
export default dbConnect;