const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Laporan = require('../models/report');

const secretKey = process.env.SECRET_KEY;


exports.createReport = async (req, res) => {
    try {
        const { judul, deskripsi, tanggalkejadian, longititude, latitude } = req.body;

        // Assume that the user ID is obtained from the authentication middleware
        const userId = req.userId;
        const image = req.file.path;
        const status = 'pending';

        const newReport = new Laporan({
            judul,
            deskripsi,
            tanggalkejadian,
            longititude,
            latitude,
            image,
            status,
            createdBy: userId, // Assign the user ID to the createdBy field in the report
        });

        await newReport.save();

        console.log('Report created by user ID:', userId);
        res.status(201).json({ message: 'Report created successfully' });
    } catch (error) {
        console.error('Error during report creation:', error.message);
        res.status(500).json({ error: error.message });
    }
};


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