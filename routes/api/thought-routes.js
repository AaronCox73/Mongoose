const { Thought } = require('../../models');
const router = require('express').Router();

// get all Thoughts
router.get('/', (req, res) => {
    Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
})
//GET to get a single thought by its _id
router.get('/:id', ({ params }, res) => {
    Thought.findOne({ _id: params.id })

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
})
//Create Thought

router.post('/', ({ body }, res) => {
    Thought.create(body)
        .then(dbThoughtData => {
            res.json(dbThoughtData)
        })
        .catch(err => {
            res.json(err);
        })
})
//update user
router.put('/:id', ({ params, body }, res) => {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with this ID' })
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err));
})

//delete user
router.delete('/:id', ({ params }, res) => {
    Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with this id' })
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
})
router.put('/:thoughtId/reactions', ({ params }, res) => {
    Thought.findByIdAndUpdate({ _id: params.thoughtId }, { $push: { thoughts: req.body } })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' })
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
})
router.delete('/:thoughtId/reactions/:reactionId', ({ params }, res) => {
    Thought.findByIdAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: params.reactionId } })
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