const mongoose = require('mongoose');
// Connect to MongoDB
mongoose.connect('mongodb+srv://siddharth020300:Siddharth02%40@cluster0.gtek3.mongodb.net/MongoDBProject1');
// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    Username : String,
    Password : String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    Username : String,
    Password : String,
    PurchasedCourse : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    Title : String,
    Description : String,
    ImageLink : String,
    Price : Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}