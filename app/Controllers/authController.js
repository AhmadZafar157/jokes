// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const userRoles = require('../../lib/userRoles');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("came to login endpoint!"+ email + "   " + password);
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        console.log("user : " + user);

        console.log('Password received:', password);
        console.log('User password:', user.password);

        // If user not found or password doesn't match, return error
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, 'Ahmad_Zafar', {
            expiresIn: '1h', // Token expires in 1 hour
        });

        res.status(200).json({ user, token });
    } catch (error) {
        console.log("error =  "+ error);
        res.status(500).json({ error: 'An error occurred during login' });
    }
};




exports.signup = async (req, res) => {
    try {
        const { email, password, acc_no, role } = req.body;
        console.log("req.body : " + req.body + "email : " + email + "password : " + password + "acc_no : " + acc_no);
        console.log("came to signup endpoint!");
        // Validate email format
        if (!/@/.test(email)) {
            console.log("I fucked up "+ email);
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Validate account number length
        if (acc_no.length !== 5) {
            return res.status(400).json({ error: 'Account number must be 5 characters long' });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("password hashing successful !");
        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            acc_no,
            role,
        });
        console.log("before saved user successful !");
        // Save the user
            var savedUser = await newUser.save();
        console.log("saved user successful !");
        // Generate JWT token
        const token = jwt.sign({ userId: savedUser._id, role: savedUser.role }, 'Ahmad_Zafar', {
            expiresIn: '1h', // Token expires in 1 hour
        });

        res.status(201).json({ savedUser , token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred during signup' });
    }
};
