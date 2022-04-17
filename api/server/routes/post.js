const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User')

//create 
router.post('/', async (req, res) => {
    const post = await new Post(req.body)
    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err)
    }
})

//update
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("updated without problems")
        } else {

            res.status(403).json("its not your post")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//delete
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
          } else{
            res.status(500).json("failed to delete")
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//like / dislike

router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).json("you like this")
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).json("u dont like this")
        }
    } catch (err) {
        res.status(500).json(err)
    }

})

//get
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err)
    }
})

//get all followings


router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id }).sort({ createdAt: 'asc' });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId }).sort({ createdAt: 'asc' });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err);
    }
});


//get user's post


router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        const posts = await Post.find({ userId: user._id })
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;