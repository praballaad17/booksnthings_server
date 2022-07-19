const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    files: String,
    thumbnail: String,
    caption: String,
    hashtags: [
        {
            type: String,
            lowercase: true,
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: String,
        ref: 'User',
    },
    title: {
        type: String,
        require: true,
    },
    paid: {
        type: mongoose.Schema({
            isPaid: Boolean,
            price: Number,
            hasPaid: Boolean
        })
    }
});

// PostSchema.pre('deleteOne', async function (next) {
//   const postId = this.getQuery()['_id'];
//   try {
//     await mongoose.model('PostVote').deleteOne({ post: postId });
//     await mongoose.model('Comment').deleteMany({ post: postId });
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;