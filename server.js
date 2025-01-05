const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Add this line
app.use('/admin', express.static('admin')); // Add this line

// MongoDB Schema
const orderSchema = new mongoose.Schema({
    name: String,
    address: String,
    mobile: String,
    items: [String]
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/cloudKitchenDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes remain the same...
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/order', async (req, res) => {
    try {
        const order = new Order({
            name: req.body.name,
            address: req.body.address,
            mobile: req.body.mobile,
            items: req.body.items.split(',')
        });
        await order.save();
        res.redirect('/order-confirmation.html');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/admin/orders', async (req, res) => {
    try {
        const orders = await Order.find({});
        res.json(orders);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});