const User = require('../models/user.model');

exports.getQuote = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).json({ status: 'error', error: 'User not found' });
        }

        return res.json({ status: 'ok', quote: user.quote });
    } catch (error) {
        res.json({ status: 'error', error: 'invalid token' });
    }
};

exports.postQuote = async (req, res) => {
    let { quote } = req.body;

    try {
        await User.updateOne({ _id: req.user.id }, { $set: { quote: quote } });
        return res.json({ status: 'ok' });
    } catch (error) {
        res.json({ status: 'error', error: 'invalid token' });
    }
};
