const express = require("express");
const { requireAuth } = require("../controllers/authControllers");
const router = express.Router();
const {
    postByUsername,
    getUserMaterialByUsername,
    getUserPursMaterialByUsername,
    getMaterialByTitle,
    getPurcMaterialById,
    buyMaterial,
    searchBook,
    addReview,
    getReviewByMaterialId,
    checkPurchased
} = require('../controllers/postControllers');

router.get('/search/:title', requireAuth, searchBook)
router.get('/title/:title', requireAuth, getMaterialByTitle)
router.post('/buy-material/:materialId', requireAuth, buyMaterial);
router.get('/get-purc-material/:userId', requireAuth, getPurcMaterialById);
router.post('/add-material/:username', requireAuth, postByUsername);
router.post('/add-review/:materialId', requireAuth, addReview);
router.get('/get-review/:materialId', requireAuth, getReviewByMaterialId);
router.get('/user-material/:username', requireAuth, getUserMaterialByUsername);
router.get('/user-pur-material/:username', requireAuth, getUserPursMaterialByUsername);
router.post('/check-purchased', requireAuth, checkPurchased);
// router.delete('/delete/:postId', deletePostById);
module.exports = router;
