const { Thought } = require('../../models');

const thoughtRoute = {
    // get all Thoughts
    getAllThought(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    //GET to get a single thought by its _id
    getThoughtById({ params }, res) {
        User.findOne({ _id: params.id })

            .then(dbThoughtData => {
                //if no user found send err
                if (!dbUserData) {
                    res.status(404), json({ message: 'No Thought found with this ID' })
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    //Create Thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => {
                res.json(dbThoughtData)
            })
            .catch(err => {
                res.json(err);
            })
    },
    //update user
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No User found with this ID' })
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err));
    },

    //delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }
}

module.exports = thoughtRoute;