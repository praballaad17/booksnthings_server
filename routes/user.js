const express = require("express");
const router = express.Router();

const {
    getUserByUsername,
    getusersFollowers,
    getusersFollowersById,
    getUserDisplayImgs,
    updateProfileImg,
    removeProfileImg,
    searchUser
} = require('../controllers/userControllers');

router.get('/search/:usernameOrname', searchUser)
router.get('/display-imgs/:username', getUserDisplayImgs)
router.get('/username/:usernameOrEmail', getUserByUsername)
router.put('/profile-img/:username', updateProfileImg)
router.delete('/profile-img/:username', removeProfileImg)


module.exports = router;