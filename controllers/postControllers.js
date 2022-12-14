const Book = require('../models/book');
const fs = require('fs')
const User = require('../models/user');
const PurcMaterial = require('../models/purcMaterial');
const PaidPost = require('../models/paidPost');
const { post } = require('../routes/post');
const Review = require('../models/review');

module.exports.postByUsername = async (req, res) => {
    const { _id, files, caption, paid, price, title } = req.body;

    console.log(req.body);
    let paidPost
    try {
        const book = new Book({
            files: files, caption: caption, author: req.params.username, title: title, paid: {
                isPaid: paid,
                price: price,
            }
        });
        if (paid) {
            paidPost = new PaidPost({ _id: book._id, author: req.params.username, price: price, paidUsers: [] })
            await paidPost.save();
        }
        await book.save();

        res.status(201).send(book);
    } catch (err) {
        console.log(err);
        res.status(400).send("unable to save book");
    }
}

module.exports.getUserPursMaterialByUsername = async (req, res) => {
    try {
        const book = await Book.findOne({ author: req.params.username })
        res.send(book)
    } catch (error) {
        return res.send(error)
    }
}

module.exports.retrivePostByUsername = async (req, res, next) => {
    try {
        const book = await Book.findOne({ author: req.params.username })
        res.send(post)
    } catch (error) {
        return res.send(error)
    }
}

module.exports.getUserMaterialByUsername = async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    // const logginUserId = req.query.logginUserId

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    let results = {}

    try {
        const book = await Book.find({ author: req.params.username }, { files: 0 }).sort([['date', -1]]).limit(limit).skip(startIndex).exec()
        results.result = book
        return res.status(200).send(results)
    } catch (error) {
        return res.send(error)
    }
}

module.exports.searchBook = async (req, res) => {

    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    let results = [];

    try {
        await Book.find({
            $or: [
                { title: { $regex: req.params.title } },
                { author: { $regex: req.params.title } }
            ]
        }).limit(limit).skip(startIndex).exec()
            .then(async (res) => {
                for (let i = 0; i < res.length; i++) {

                    results.push({ _id: res[i]._id, title: res[i].title, author: res[i].author, paid: res[i].paid })
                }
            })

        return res.send(results)
    } catch (error) {
        return res.send(error)
    }
}

module.exports.getMaterialByTitle = async (req, res) => {
    try {
        const book = await Book.findOne({ title: req.params.title })
        res.send(book)
    } catch (error) {
        return res.send(error)
    }
}

module.exports.buyMaterial = async (req, res) => {
    const { author, userId, username } = req.body
    console.log(req.params.materialId, author, userId, username);

    try {
        await PurcMaterial.findOneAndUpdate({ userId: userId }, {
            $push: {
                purcmaterial: [{ _id: req.params.materialId }]
            }
        })
        console.log("added");
        return res.send("added")
    } catch (error) {
        return res.send(error)
    }
}

module.exports.getPurcMaterialById = async (req, res) => {
    try {
        const { purcmaterial } = await PurcMaterial.findOne({ userId: req.params.userId }, { files: 0 })
        console.log(purcmaterial);
        const resultArray = purcmaterial.map(async (id) => {
            console.log();
            const result = await Book.findById(id._id)
            if (!result) {
                return
            }
            return result
        })
        const books = await Promise.all(resultArray);
        res.send(books)
    } catch (error) {
        res.send(error)
    }
}

module.exports.addReview = async (req, res) => {
    const { message, userId } = req.body
    try {
        const review = new Review({ message, user: userId, book: req.params.materialId });
        review.save()
        res.send(review)
    } catch (error) {
        return res.send(error)
    }
}

module.exports.getReviewByMaterialId = async (req, res) => {
    const { message, userId } = req.body
    try {
        const reviews = await Review.find({ book: req.params.materialId });
        res.send(reviews)
    } catch (error) {
        return res.send(error)
    }
}

module.exports.checkPurchased = async (req, res) => {
    const { userId, materialId } = req.body
    const responce = await PurcMaterial.findOne({ userId, "purcmaterial._id": materialId })
    if (responce) return res.status(200).send(true)
    else return res.status(202).send(false)
}



