const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {Course, User} = require("../db");
const { default: mongoose } = require("mongoose");
// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const Username = req.body.Username;
    const Password = req.body.Password;
    await User.create({
        Username : Username,
        Password : Password
    })
    res.json({
        msg : "User Account created"
    });
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const courseslist = await Course.find({});
    res.json({
        msg : courseslist
    });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
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

router.get('/PurchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        Username : req.headers.Username
    });
    console.log(user.PurchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.PurchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router