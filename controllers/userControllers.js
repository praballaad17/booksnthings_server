
const User = require('../models/user');
const ProfileImg = require('../models/profileImg');
const { paginationResults } = require('../middleware/pagination');

// module.exports.getusersFollowers = async (req, res, next) => {
//     try {
//         const user = await User.findOne({ username: req.params.username })
//         const { followers } = await Followers.findOne({ user: user._id })
//         res.send(followers)
//     } catch (error) {
//         res.send(error)
//     }
// }

module.exports.searchUser = async (req, res) => {

    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    let results = [];
    let imgs = [];

    try {
        await User.find({
            $or: [
                { username: { $regex: req.params.usernameOrname } },
                { email: { $regex: req.params.usernameOrname } },
                { fullName: { $regex: req.params.usernameOrname } }
            ]
        }).limit(limit).skip(startIndex).exec().then(async (res) => {
            const usernameA = []

            for (let i = 0; i < res.length; i++) {
                usernameA.push(res[i].username)
                results.push({ username: res[i].username, fullname: res[i].fullName })
            }
            await ProfileImg.find({
                "user.username": { $in: usernameA }
            }).then(ans => {
                for (let i = 0; i < res.length; i++) {
                    imgs.push({ profileImg: ans[i].displayImg.profileImg, username: ans[i].user.username })
                }
            })
        })


        let user = imgs.map((item, i) => Object.assign({}, item, results[i]))
        return res.send(user)
    } catch (error) {
        return res.send(error)
    }
}

// module.exports.getusersFollowersById = async (req, res, next) => {
//     try {
//         const { followers } = await Followers.findOne({ user: req.params.userId })
//         res.send(followers)
//     } catch (error) {
//         res.send(error)
//     }
// }

// module.exports.getusersFollowing = async (req, res, next) => {
//     try {
//         const user = await User.findOne({ username: req.params.username })
//         const { following } = await Following.findOne({ user: user._id })
//         res.send(following)
//     } catch (error) {
//         res.send(error)
//     }
// }

// module.exports.updateUnfollowRequest = async (req, res, next) => {
//     try {
//         await Followers.findOneAndUpdate({ user: req.params.profileUserId }, {
//             $pull: {
//                 followers: { _id: req.body.followingUserId }
//             }
//         })
//         await Following.findOneAndUpdate({ user: req.body.followingUserId }, {
//             $pull: {
//                 following: { _id: req.params.profileUserId }
//             }
//         })
//         res.status(200).send("unfollowed")
//     } catch (error) {
//         res.send(error)
//     }
// }

module.exports.getUserByUsername = async (req, res, next) => {
    const user = await User.findOne({
        $or: [{ email: req.params.usernameOrEmail }, { username: req.params.usernameOrEmail }],
    }).select("-password");
    res.send(user);
}

// module.exports.updateFollowRequest = async (req, res, next) => {
//     try {
//         await Followers.findOneAndUpdate({ user: req.params.profileUserId }, {
//             $push: {
//                 followers: [{ _id: req.body.followingUserId }]
//             }
//         })
//         await Following.findOneAndUpdate({ user: req.body.followingUserId }, {
//             $push: {
//                 following: [{ _id: req.params.profileUserId }]
//             }
//         })
//         return res.status(200).send("followed")
//     } catch (error) {
//         return res.send(error)
//     }
// }

module.exports.updateProfileImg = async (req, res) => {
    const { profileImg } = req.body
    const userProfile = await ProfileImg.findOne({ "user.username": req.params.username })
    if (!userProfile) return res.status(400).send("Document Not found check the user database")

    const updateImg = await ProfileImg.findByIdAndUpdate(userProfile._id,
        {
            $set: {
                displayImg: {
                    profileImg: profileImg,
                }
            }
        }, { new: true })
    return res.send(updateImg)
}

module.exports.removeProfileImg = async (req, res) => {
    const userProfile = await ProfileImg.findOne({ "user.username": req.params.username })
    if (!userProfile) return res.status(400).send("Document Not found check the user database")

    const updateImg = await ProfileImg.findByIdAndUpdate(userProfile._id,
        {
            $set: {
                displayImg: {
                    profileImg: "",
                }
            }
        })
    return res.send(updateImg)
}

module.exports.getUserDisplayImgs = async (req, res) => {
    const userProfile = await ProfileImg.findOne({ "user.username": req.params.username })
    if (!userProfile) return res.status(400).send("Document Not found check the user database")

    // const result = await ProfileImg.findOne({ "user.username": req.params.username })
    return res.status(200).send(userProfile)
}
