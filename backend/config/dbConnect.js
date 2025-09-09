import mongoose, { mongo } from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MONGO DB connected successfully`);
  } catch (error) {
    console.log(`connection with MONGO DB failed`);
  }
};

export default connectDb;