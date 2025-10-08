const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/Movie', require('./routes'));
router.use('/auth', require('./authRoutes'));

router.get('/', (req, res) => {

    res.send('hello there, Welcome to my translated movie api. Enjoy');
});

module.exports = router;