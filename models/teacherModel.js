import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  idCard: {
    data: Buffer,
    contentType: String,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  qualifications: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    trim: true,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    requried: true,
    trim: true,
  },
  answer: {
    type: String,
    requried: true,
    trim: true,
  },
  password: {
    type: String,
    requried: true,
    trim: true,
  },
  bankDetail: {
    type: String,
    trim: true,
  },
  experience: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: Number,
    default: 2,
  },
});

export default mongoose.model("Teacher", teacherSchema);
