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

router.get('/search/:title', searchBook)
router.get('/title/:title', getMaterialByTitle)
router.post('/buy-material/:materialId', buyMaterial);
router.get('/get-purc-material/:userId', getPurcMaterialById);
router.post('/add-material/:username', postByUsername);
router.post('/add-review/:materialId', addReview);
router.get('/get-review/:materialId', getReviewByMaterialId);
router.get('/user-material/:username', getUserMaterialByUsername);
router.get('/user-pur-material/:username', getUserPursMaterialByUsername);
router.post('/check-purchased', checkPurchased);
// router.delete('/delete/:postId', deletePostById);
module.exports = router;
