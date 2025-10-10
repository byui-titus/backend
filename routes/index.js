const router = require('express').Router();

router.use('/', require('./swagger'));
const authRoutes = require('./authRoutes');

router.use('/auth', authRoutes);

router.use('/Movie', require('./routes'));

router.get('/', (req, res) => {

    res.send('hello there, Welcome to my translated movie api. Enjoy');
});

module.exports = router;