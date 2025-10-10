const mongodb = require('./data/database');
const bcrypt = require('bcrypt');

function getCollection() {
    return mongodb.getDatabase().db().collection("movie_app");
}

async function createUser(userData) {
    const users = db.collection(collectionName);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = {...userData, password: hashedPassword };
    const result = await users.insertOne(user);
    return result;
}

async function findByEmail(email) {
    return await getCollection().findOne({ email });
}

module.exports = { createUser, findByEmail };