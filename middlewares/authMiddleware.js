require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const verifyToken = (token, role, res, next) => {
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err || (role && decoded.role !== role)) {
            return res.status(401).json({ error: `Unauthorized - Invalid token or not a ${role}` });
        }

        req.userId = decoded.userId;
        if (role === 'admin') {
            req.adminId = decoded.userId;
        }

        next();
    });
};

exports.verifyUser = (req, res, next) => {
    const token = req.headers.authorization;
    verifyToken(token, null, res, next);
};

exports.verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    verifyToken(token, 'admin', res, next);
};
