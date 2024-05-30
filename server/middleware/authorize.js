const jwt = require('jsonwebtoken')

exports.authorize = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if (!token) {
        res.status(401).json({ status: "err", error: "Token not provided" })
    }

    try {
        let decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (err) {
        err.status(401).json({ status: 'error', error: 'Invalid token' });
    }
};