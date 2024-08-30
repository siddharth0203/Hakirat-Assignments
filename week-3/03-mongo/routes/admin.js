const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, Course} = require("../db");
// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const Username = req.body.Username;
    const Password = req.body.Password;
    Admin.create({
        Username : Username,
        Password : Password
    });
    res.json({
        msg : "Admin Username and Password created"
    });
});

router.post('/courses', adminMiddleware, async(req, res) => {
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

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courselist = await Course.find({});
    res.json({
        msg : courselist
    })
});

module.exports = router;