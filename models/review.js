const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    message: String,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    book: {
        type: Schema.ObjectId,
        ref: 'Book'
    }
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;