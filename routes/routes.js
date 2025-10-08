const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movie');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, movieController.createMovie);
router.get('/', protect, movieController.getMovies);
router.get('/:id', protect, movieController.getMovie);
router.put('/:id', protect, movieController.updateMovie);
router.delete('/:id', protect, movieController.deleteMovie);


// new endpoints
router.get('/:id/stream', movieController.streamMovie);
router.get('/:id/download', movieController.downloadMovie);


module.exports = router;