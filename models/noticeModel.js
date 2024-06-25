import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    trim: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },

  date: {
    type: String,
    required: true,
    trim: true,
  },
  catagory: {
    type: String,
    required: true,
    trim: true,
  },
});
export default mongoose.model("Notice", noticeSchema);
