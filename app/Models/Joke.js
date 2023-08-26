// Joke model
const mongoose = require('mongoose');

const jokeSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    approved: {
        type: Boolean,
        default: false,
    },
});



const Joke = mongoose.model('Joke', jokeSchema);
module.exports = Joke;
