
const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction')

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

    },
    username: {
        type: String,
        required: true,

    },
    reactions: [ReactionSchema]
    // Array of nested documents created with the reactionSchema
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ReactionSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})
const Thought = model('Thought', ThoughtSchema)

module.exports = Thought;