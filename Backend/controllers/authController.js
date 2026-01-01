import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../helpers/authHelper.js';

const JWT_SECRET = 'your_super_secret_key_123';

// 1. REGISTER
export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await hashPassword(password);

        // Create user
        const newUser = new User({
            name,
            email,
            password: hashedPassword, 
            role: role || 'Employee'
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// 2. LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Use Helper to Compare
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate Token
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        // Send Cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.DEV_MODE !== 'development',
            sameSite: 'strict',
            maxAge: 3600000 
        });

        res.json({ message: 'Login successful', role: user.role });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};