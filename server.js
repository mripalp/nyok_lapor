require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const promMid = require('express-prometheus-middleware');

const app = express();
app.use(bodyParser.json());

// Setup logging with Morgan
app.use(morgan('dev'));

// Setup Prometheus monitoring
app.use(promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
}));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error.message);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 2700;

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
