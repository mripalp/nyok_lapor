const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Laporan = require('../models/report');

const secretKey = process.env.SECRET_KEY;

exports.getReports = async (req, res) => {
    try {
        const reports = await Laporan.find();
        res.status(200).json({ reports });
    } catch (error) {
        console.error('Error fetching reports:', error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { fullName, phoneNumber, email, password, role } = req.body;

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ error: 'Admin already exists with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            fullName,
            phoneNumber,
            email,
            password: hashedPassword,
            role,
        });

        await newAdmin.save();

        console.log('Admin registered:', newAdmin.email);
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error('Error during admin registration:', error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: admin._id, role: admin.role }, secretKey, { expiresIn: '1h' });

        console.log('Admin logged in:', admin.email);
        res.status(200).json({ message: 'Login successful', token, userId: admin._id });
    } catch (error) {
        console.error('Error during admin login:', error.message);
        res.status(500).json({ error: error.message });
    }
};


exports.getProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.adminId);

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        res.status(200).json({ profile: admin });
    } catch (error) {
        console.error('Error fetching admin profile:', error.message);
        res.status(500).json({ error: error.message });
    }
};


exports.getDashboardData = async (req, res) => {
    try {
        // Simulasi data dummy
        const reportsPerDay = Math.max(100, Math.floor(Math.random() * 200));
        const successfulReports = Math.max(100, Math.floor(Math.random() * 200));
        const totalReports = Math.max(100, Math.floor(Math.random() * 200));
        const totalReportsThisMonth = Math.max(100, Math.floor(Math.random() * 200));
        const totalUsersThisMonth = Math.max(100, Math.floor(Math.random() * 200));

        // Menggabungkan semua data dalam objek dashboardData
        const dashboardData = {
            reportsPerDay,
            averageSuccessfulReports: totalReports > 0
                ? successfulReports / totalReports
                : 0,
            totalReportsThisMonth,
            totalUsersThisMonth,
        };

        res.status(200).json({ dashboardData });
    } catch (error) {
        console.error('Error generating dummy dashboard data:', error.message);
        res.status(500).json({ error: error.message });
    }
};
