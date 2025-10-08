const jwt = require("jsonwebtoken");

const protect = async(req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer "))
        return res.status(401).json({ message: "Unauthorized" });

    const token = auth.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Token invalid or expired" });
    }
};

const checkAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });
    next();
};

const checkPayment = (req, res, next) => {
    if (!req.user || !req.user.isPaid) return res.status(403).json({ message: "Payment required" });
    next();
};


module.exports = {
    protect,
    checkAdmin,
    checkPayment

}