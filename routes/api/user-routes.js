const { User } = require('../../models');
const router = require('express').Router();

// get all users
router.get('/', (req, res) => {
    User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
})
//GET a single user by its _id and populated thought and friend data
router.get('/:id', ({ params }, res) => {
    User.findOne({ _id: params.id })
        .populate({
            path: 'Thought',
            select: '-__v'
        })
        .then(dbUserData => {
            //if no user found send err
            if (!dbUserData) {
                res.status(404), json({ message: 'No User found with this ID' })
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
})
//Create User
router.post('/', ({ body }, res) => {
    User.create(body)
        .then(dbUserData => {
            res.json(dbUserData)
        })
        .catch(err => {
            res.json(err);
        })
})
//update user
router.put('/:id', ({ params, body }, res) => {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this ID' })
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err));
})

//delete user
router.delete('/:id', ({ params }, res) => {
    User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' })
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
})
router.post('/:userId/friends/:friendId', ({ params }, res) => {
    User.findByIdAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId } })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' })
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
})
router.delete('/:userId/friends/:friendId', ({ params }, res) => {
    User.findByIdAndUpdate({ _id: params.userId }, { $pull: { friends: params.friendId } })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' })
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
})


module.exports = router;