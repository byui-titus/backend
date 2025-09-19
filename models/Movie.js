const ObjectId = require('mongodb').ObjectId;
const fs = require('fs');
const path = require('path');
const mongodb = require('../data/database');

function getCollection() {
    return mongodb.getDatabase().db().collection("movie_app");
}

// CRUD
async function createMovie(movie) {
    return await getCollection().insertOne(movie);
}

async function getAllMovies() {
    return await getCollection().find().toArray();
}

async function getMovieById(id) {
    return await getCollection().findOne({ _id: new ObjectId(id) });
}

async function updateMovie(id, data) {
    return await getCollection().updateOne({ _id: new ObjectId(id) }, { $set: data });
}

async function deleteMovie(id) {
    return await getCollection().deleteOne({ _id: new ObjectId(id) });
}

// Streaming
function streamMovie(filePath, range, res) {
    const fullPath = path.resolve(filePath);
    const stat = fs.statSync(fullPath);
    const fileSize = stat.size;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunkSize = (end - start) + 1;
        const file = fs.createReadStream(fullPath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        res.writeHead(200, {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        });
        fs.createReadStream(fullPath).pipe(res);
    }
}

// Download
function downloadMovie(filePath, res) {
    const fullPath = path.resolve(filePath);
    res.download(fullPath);
}

module.exports = {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
    streamMovie,
    downloadMovie
};