const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, Course} = require('../db');
const jwtLibrary = require('jsonwebtoken');
const {secret} = require("../jwtsecret");
// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const Username = req.body.Username;
    const Password = req.body.Password;
    await Admin.create({
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
    const user = await Admin.find({
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

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const Title = req.body.Title;
    const Description = req.body.Description;
    const ImageLink = req.body.ImageLink;
    const Price = req.body.Price;
    await Course.create({
        Title : Title,
        Description : Description,
        ImageLink : ImageLink,
        Price : Price
    })
    res.json({
        msg : "Course Created by Admin"
    });
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});
    res.json({
        msg : response
    });
});

module.exports = router;