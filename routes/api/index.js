const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoute = require('./user-routes');



router.use('/thoughts', thoughtRoutes)

router.use('/users', userRoute);

module.exports = router;