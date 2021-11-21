const { User } = require('../../models');

const userRoute = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    //GET a single user by its _id and populated thought and friend data
    getUserById({ params }, res) {
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
    },
    //Create User
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => {
                res.json(dbUserData)
            })
            .catch(err => {
                res.json(err);
            })
    },
    //update user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this ID' })
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err));
    }
}

module.exports = userRoute;