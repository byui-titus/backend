const jwt = require("jsonwebtoken");

const register = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const existing = await req.app.locals.userModel.findByEmail(email);
        if (existing) return res.status(400).json({ message: "Email already exists" });

        await req.app.locals.userModel.create({ name, email, password });

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await req.app.locals.userModel.findByEmail(email);
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await req.app.locals.userModel.comparePassword(user, password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role, isPaid: user.isPaid },
            process.env.JWT_SECRET, { expiresIn: "7d" }
        );

        res.json({ token, role: user.role, isPaid: user.isPaid });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    login,
    register
}