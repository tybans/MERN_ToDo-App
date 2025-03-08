const express = require("express");
const User = require("../models/user");

// Import bcrypt.js for password hashing
const bcrypt = require("bcryptjs");

// Import jsonwebtoken for generating authentication tokens
const jwt = require("jsonwebtoken");

// Create an Express router instance
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        //  Extract user details from the request body
        const { name, email, password } = req.body;

        //  Check if a user with the same email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) 
            return res.status(400).json({ message: "User already exists" });

        //  Hash the user's password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        //  Create a new user instance with the provided data
        const newUser = new User({ name, email, password: hashedPassword });

        //  Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


router.post("/login", async (req, res) => {
    try {
        //  Extract email and password from the request body
        const { email, password } = req.body;

        //  Find the user by email in the database
        const user = await User.findOne({ email });

        //  If user does not exist, return an error response
        if (!user) 
            return res.status(400).json({ message: "User not found" });

        //  Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);

        //  If passwords do not match, return an error response
        if (!isMatch) 
            return res.status(400).json({ message: "Invalid credentials" });

        //  Generate a JSON Web Token (JWT) for authentication, valid for 1 hour
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        // Send the generated token, user ID and name as a response
        res.json({ token, userId: user._id, name: user.name });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
