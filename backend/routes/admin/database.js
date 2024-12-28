const mongoose = require("mongoose")
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;

const { ObjectId } = mongoose.Schema.Types;

mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

const userSchema = new mongoose.Schema({
    username :String,
    firstname :String,
    lastname :String,
    password :String,
})

const adminSchema = new mongoose.Schema({
    username:String,
    firstName: String,
    lastName: String,
    password: String,
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
});

const purchaseSchema = new mongoose.Schema({
    userId: ObjectId,
    courseId: ObjectId
});

const User = mongoose.model('User',userSchema)
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    User,
    adminModel,
    courseModel,
    purchaseModel
}
