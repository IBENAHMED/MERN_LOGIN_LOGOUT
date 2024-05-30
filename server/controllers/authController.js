const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    let { name, email, password } = req.body;

    try {
        const newPassword = await bcrypt.hash(password, 10);
        await User.create({
            password: newPassword,
            name, email
        });
        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' });
    }
};

exports.login = async (req, res) => {
    let { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid login' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        return res.json({ status: 'ok', user: token, _id: user._id, role: user.role });
    } else {
        return res.json({ status: 'error', user: false });
    }
};