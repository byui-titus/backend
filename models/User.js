const ObjectId = require("mongodb");
const bcrypt = require("bcrypt");

export class User {
    constructor(mongodb) {
        this.collection = mongodb.collection("users");
    }

    async create({ name, email, password, role = "user", isPaid = false }) {
        const hashed = await bcrypt.hash(password, 10);
        const result = await this.collection.insertOne({
            name,
            email,
            password: hashed,
            role,
            isPaid,
            createdAt: new Date(),
        });
        return result;
    }

    async findByEmail(email) {
        return await this.collection.findOne({ email });
    }

    async findById(id) {
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }

    async comparePassword(user, password) {
        return await bcrypt.compare(password, user.password);
    }
}