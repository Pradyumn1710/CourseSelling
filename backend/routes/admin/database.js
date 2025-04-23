const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;
const { ObjectId } = mongoose.Schema.Types;

// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));

// ======================= User Schema =======================
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

// ======================= Admin Schema =======================
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

// ======================= Course Schema =======================
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  imageUrl: String,
  creatorId: {
    type: ObjectId,
    required: true,
    ref: "admin" // assuming admin creates courses
  }
}, { timestamps: true });

// ======================= Purchase Schema =======================
const purchaseSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  courseId: {
    type: ObjectId,
    required: true,
    ref: "course"
  }
}, { timestamps: true });

// ======================= Models =======================
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("admin", adminSchema);
const Course = mongoose.model("course", courseSchema);
const Purchase = mongoose.model("purchase", purchaseSchema);

// ======================= Export =======================
module.exports = {
  User,
  Admin,
  Course,
  Purchase
};
