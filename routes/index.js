const router = require('express').Router();

router.use('/', require('./swagger'));

const authRoutes = require('./authRoutes');
router.use('/auth', authRoutes);

// Movie routes
const movieRoutes = require('./movieRoutes'); // ✅ make sure you have this file
router.use('/Movie', movieRoutes);

router.get('/', (req, res) => {

    res.send('hello there, Welcome to my translated movie api. Enjoy');
});

module.exports = router;