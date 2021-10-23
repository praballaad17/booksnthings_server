const express = require("express");
const router = express.Router();

const {
    postByUsername,
    retrivePostByUsername,
    getUserMaterialByUsername,
    getUserPursMaterialByUsername,
    getMaterialByTitle,
    getPurcMaterialById,
    buyMaterial,
    searchBook,
    addReview,
    getReviewByMaterialId
} = require('../controllers/postControllers');
const Book = require("../models/book");

router.get('/search/:title', searchBook)
router.get('/title/:title', getMaterialByTitle)
router.post('/buy-material/:materialId', buyMaterial);
router.get('/get-purc-material/:userId', getPurcMaterialById);
router.post('/:username', postByUsername);
router.post('/add-review/:materialId', addReview);
router.get('/get-review/:materialId', getReviewByMaterialId);
router.get('/:username', retrivePostByUsername);
router.get('/user-material/:username', getUserMaterialByUsername);
router.get('/user-pur-material/:username', getUserPursMaterialByUsername);
// router.delete('/delete/:postId', deletePostById);
module.exports = router;
