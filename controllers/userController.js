const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Report = require('../models/report');

const secretKey = process.env.SECRET_KEY;

exports.register = async (req, res) => {
    try {
        const { fullName, phoneNumber, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullName,
            phoneNumber,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        console.log('User registered:', newUser.email);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during user registration:', error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, { expiresIn: '1h' });

        console.log('User logged in:', user.email);
        res.status(200).json({ message: 'Login successful', token, userId: user._id });
    } catch (error) {
        console.error('Error during user login:', error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ profile: user });
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// exports.getDashboardData = async (req, res) => {
//     try {
//         const { userId } = req;

//         // Jumlah Laporan per Hari
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);
//         const reportsPerDay = await Report.countDocuments({
//             userId,
//             createdAt: { $gte: today },
//         });

//         // Rata-rata Laporan Berhasil
//         const successfulReports = await Report.countDocuments({
//             userId,
//             status: 'success', // Ubah sesuai dengan properti status yang digunakan dalam model laporan
//         });
//         const totalReports = await Report.countDocuments({ userId });
//         const averageSuccessfulReports = totalReports > 0
//             ? successfulReports / totalReports
//             : 0;

//         // Total Laporan Per Bulan (Tahun Ini)
//         const thisMonth = new Date();
//         thisMonth.setMonth(0, 1);
//         thisMonth.setHours(0, 0, 0, 0);
//         const totalReportsThisMonth = await Report.countDocuments({
//             userId,
//             createdAt: { $gte: thisMonth },
//         });

//         // Total Pengguna Per Bulan
//         const totalUsersThisMonth = await User.countDocuments({
//             createdAt: { $gte: thisMonth },
//         });

//         // Menggabungkan semua data dalam objek dashboardData
//         const dashboardData = {
//             reportsPerDay,
//             averageSuccessfulReports,
//             totalReportsThisMonth,
//             totalUsersThisMonth,
//         };

//         res.status(200).json({ dashboardData });
//     } catch (error) {
//         console.error('Error fetching dashboard data:', error.message);
//         res.status(500).json({ error: error.message });
//     }
// };