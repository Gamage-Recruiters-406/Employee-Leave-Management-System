import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_super_secret_key_123'; 
export const verifyToken = (req, res, next) => {
    // Check Cookies
    let token = req.cookies.jwt;

    // Check Headers (Backup)
    if (!token) {
        const authHeader = req.header('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.slice(7);
        }
    }

    // Reject if no token
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

export const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access Denied: Admins Only' });
    }
    next();
};