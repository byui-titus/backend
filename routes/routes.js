const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movie');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, movieController.createMovie);
router.get('/', authMiddleware, movieController.getMovies);
router.get('/:id', authMiddleware, movieController.getMovie);
router.put('/:id', authMiddleware, movieController.updateMovie);
router.delete('/:id', authMiddleware, movieController.deleteMovie);


// new endpoints
router.get('/:id/stream', movieController.streamMovie);
router.get('/:id/download', movieController.downloadMovie);


module.exports = router;