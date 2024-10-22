import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log(colors.bgYellow(`connected to database ${con.connection.host}`));
  } catch (error) {
    console.log(colors.bgRed("==>>", error));
  }
};
