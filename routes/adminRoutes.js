// routes/adminRoutes.js
const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.get('/profile', authMiddleware.verifyAdmin, adminController.getProfile);
router.get('/summary', authMiddleware.verifyAdmin, adminController.getDashboardData);
router.get('/report', authMiddleware.verifyAdmin, adminController.getReports);


module.exports = router;
