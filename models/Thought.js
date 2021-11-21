
const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: [1, 'Too few Characters. Must be at least 1'],
        max: [280, 'Too many Characters. Must be less than 280'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        toJSON: {
            getters: true
        }
    },
    username: {
        type: String,
        required: true,

    },
    reactions: [
        // Array of nested documents created with the reactionSchema
        {
            type: Schema.Types.ObjectId,
            ref: 'ReactionSchema'
        }
        // ^??
    ]
});

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought;