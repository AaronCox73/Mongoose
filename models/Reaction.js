
const { Schema } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Schema.Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        max: [280, 'Too many characters, must be 280 or fewer.'],
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,

    },

})


module.exports = ReactionSchema;