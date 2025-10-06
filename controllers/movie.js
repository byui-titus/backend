const Movie = require('../models/Movie');


const createMovie = async(req, res) => {
    try {
        const movie = {
            title: req.body.title,
            description: req.body.description,
            genre: req.body.genre,
            releaseYear: req.body.releaseYear,
            rating: req.body.rating,
            filePath: req.body.filePath,
            poster: req.body.poster,
            vj: req.body.vj,
            createdAt: new Date()
        };
        const result = await Movie.createMovie(movie);
        res.status(201).json({ message: "Movie added", id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ ALL
const getMovies = async(req, res) => {
    try {
        const movies = await Movie.getAllMovies();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ ONE
const getMovie = async(req, res) => {
    try {
        const movie = await Movie.getMovieById(req.params.id);
        if (!movie) return res.status(404).json({ error: "Movie not found" });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE
const updateMovie = async(req, res) => {
    const movie = {
        poster: req.body.poster,
    };
    try {
        const result = await Movie.updateMovie(req.params.id, movie);
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Movie not found" });
        }
        res.json({ message: "Movie updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};

// DELETE
const deleteMovie = async(req, res) => {
    try {
        const result = await Movie.deleteMovie(req.params.id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Movie not found" });
        }
        res.json({ message: "Movie deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// STREAM
const streamMovie = async(req, res) => {
    try {
        const movie = await Movie.getMovieById(req.params.id);
        if (!movie || !movie.filePath) {
            return res.status(404).json({ error: "Movie file not found" });
        }
        const range = req.headers.range;
        if (!range) {
            return res.status(400).send("Requires Range header");
        }
        Movie.streamMovie(movie.filePath, range, res);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DOWNLOAD
const downloadMovie = async(req, res) => {
    try {
        const movie = await Movie.getMovieById(req.params.id);
        if (!movie || !movie.filePath) {
            return res.status(404).json({ error: "Movie file not found" });
        }
        Movie.downloadMovie(movie.filePath, res);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createMovie,
    getMovies,
    getMovie,
    updateMovie,
    deleteMovie,
    streamMovie,
    downloadMovie
};