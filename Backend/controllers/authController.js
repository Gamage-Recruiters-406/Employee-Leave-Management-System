import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../helpers/authHelper.js';

const JWT_SECRET = 'your_super_secret_key_123';

// 1. REGISTER
export const register = async (req, res) => {
    try {
        
        const { name, email, password, phone, role } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields (Name, Email, Password, Phone) are required!" 
            });
        }

        // Check Existing User
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: 'User already exists' 
            });
        }

        // Hash Password
        const hashedPassword = await hashPassword(password);

        // Create User
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role: role || 'Employee'
        });

        await newUser.save();

        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully',
            user: { name, email, role }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            success: false,
            message: 'Error registering user', 
            error: error.message 
        });
    }
};

// 2. LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "Email and password are required" 
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid credentials' 
            });
        }

        // Generate Token
        const token = jwt.sign({ _id: user._id, role: user.role ,name: user.name }, JWT_SECRET, { expiresIn: '7d' });

        // Send Cookie & Response
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.DEV_MODE !== 'development',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }).status(200).json({ 
            success: true,
            message: 'Login successful', 
            user: { 
                _id: user._id, 
                name: user.name, 
                role: user.role, 
                email: user.email 
            },
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            success: false,
            message: 'Error logging in', 
            error: error.message 
        });
    }
};