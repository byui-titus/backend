const { getDb } = require('../data/database');
const bcrypt = require('bcrypt');

const collectionName = 'users';

async function createUser(userData) {
    const db = getDb();
    const users = db.collection(collectionName);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = {...userData, password: hashedPassword };
    const result = await users.insertOne(user);
    return result;
}

async function findByEmail(email) {
    const db = getDb();
    return await db.collection(collectionName).findOne({ email });
}

module.exports = { createUser, findByEmail };