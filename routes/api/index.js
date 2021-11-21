const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoute = require('./user-routes');



router.use('/thought', thoughtRoutes)

router.use('/user', userRoute);

module.exports = router;