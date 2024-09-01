const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require('../db');
const jwtLibrary = require('jsonwebtoken');
const {secret} = require("../jwtsecret");
// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const Username = req.body.Username;
    const Password = req.body.Password;
    await User.create({
        Username : Username,
        Password : Password
    });
    res.json({
        msg : "Admin created successfully"
    });
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const Username = req.body.Username;
    const Password = req.body.Password;
    const user = await User.find({
        Username : Username,
        Password : Password
    });
    if(user){
        const token = jwtLibrary.sign(Username, secret);
        res.json({
            token : token
        });
    }else{
        res.json({
            msg: "Incorrect Username & Password"
        })
    }
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});
    res.json({
        msg : response
    });
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const Username = req.headers.Username;
    await User.updateOne({
        Username : Username,
        "$push" : {
            PurchasedCourse : courseId
        }
    });
    res.json({
        msg : "Course has been Purchased by the User"
    })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    let {Username}=req.body;
    const user = await User.findOne({Username});
    const purchasedCourses = [...new Set(user.PurchasedCourse)]; // De-duplicate ObjectId
    const coursesList = await Course.find({
        _id: { "$in": purchasedCourses }
    });

    res.json({
        courses: coursesList
    });
});

module.exports = router