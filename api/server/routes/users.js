const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")

//update
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("U cannot update the account")
    }
})

//get all users

router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }

})


// search user

router.get('/search/:username', async (req, res) => {
    try {
        const users = await User.find({ username: req.params.username })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)

    }
})

//delete 
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete({ _id: req.params.id });
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("U cannot delete the account")
    }
})

//get

router.get('/', async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        const { password, updatedAt, ...others } = user._doc;
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

//get friends

router.get('/friends/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId)
            })
        )
        let friendList = [];
        friends.map(friend => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture })
        })
        res.status(200).json(friendList)
    } catch (error) {
        res.status(500).json(error)
    }
})

//follow a user

router.put('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("u follow this user")
            } else {
                res.status(403).json("You already follow this dude")
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You cannot follow :(")
    }
})

//unfollow a user
router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("u unfollow this user")
            } else {
                res.status(403).json("You dont unfollow this dude")
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You cannot unfollow :(")
    }
})

module.exports = router;