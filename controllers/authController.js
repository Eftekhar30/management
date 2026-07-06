const User = require('../models/user'); // Ensure lowercase matches your file
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
    const { email, fullName, studentId, department, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ email, fullName, studentId, department, password: hashPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Upgraded to use Environment Variable AND include fullName for the Notice Board
        const secret = process.env.JWT_SECRET || "my_super_secret_key";
        const token = jwt.sign(
            { id: user.id, role: user.role, fullName: user.fullName }, 
            secret, 
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user: { email: user.email, name: user.fullName, department: user.department, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};