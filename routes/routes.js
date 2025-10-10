const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movie');
//const { protect } = require('../middleware/authMiddleware');

router.post('/', movieController.createMovie);
router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);


// new endpoints
router.get('/:id/stream', movieController.streamMovie);
router.get('/:id/download', movieController.downloadMovie);


module.exports = router;