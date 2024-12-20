const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// /user/test : route for this
// router.get('/test',(req,res)=>{
//     res.send('user test route')
// })

router.get("/register", (req, res) => {
  res.render("register");
});
router.post(
  "/register",
  body("email").trim().isEmail().isLength({ min: 13 }),
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "invalid data",
      });
    }

    const { username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10); // 10 is hashing balanced count

    const newUser = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    // res.json(newUser);
    res.redirect('/user/login');
  }
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ //400 Bad Request
        errors: errors.array(),
        message: "invalid data",
      });
    }

    const { username, password } = req.body;

    const user = await userModel.findOne({
      username: username,
    });

    if (!user) {
      return res.status(400).json({
        message: "username or password is incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "username or password is incorrect",
      });
    }

    /*install :  npm i jsonwebtoken */

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET
    );

    res.cookie('token', token)

    // Redirect to home page after successful login
    res.redirect('/home');
  }
);

module.exports = router;
