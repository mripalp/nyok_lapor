require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const verifyToken = (token, role, req, res, next) => {
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('Error during token verification:', err.message);
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }
    
        if (decoded.role !== role) {
            return res.status(401).json({ error: `Unauthorized - Invalid role, expected ${role}` });
        }
        req.userId = decoded.userId;
        req.adminId = req.userId;
        next();
    });
};

exports.verifyUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Mengambil token setelah menghapus "Bearer "
    const token = authHeader.substring(7);

    verifyToken(token, 'user', req, res, next);
};


exports.verifyAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Mengambil token setelah menghapus "Bearer "
    const token = authHeader.substring(7);

    verifyToken(token, 'admin', req, res, next);
};
