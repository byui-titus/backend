const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongodb = require('../data/database');

async function register(req, res) {
    try {
        const db = mongodb.getDb().db();
        const { name, email, password, role } = req.body;

        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.collection('users').insertOne({
            name,
            email,
            password: hashedPassword,
            role: role || 'user',
            isPaid: false,
        });

        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function login(req, res) {
    try {
        const db = mongodb.getDb().db();
        const { email, password } = req.body;

        const user = await db.collection('users').findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'defaultsecret', { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { register, login };