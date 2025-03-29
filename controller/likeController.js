const Like = require('../models/like');

exports.like = async (req, res) => {

    try {

        const userLiked = await Like.findOne({

            user: req.currentUser.id,

            post: req.params.postId

        });


        if (userLiked) {

            await Like.deleteOne({

                user: req.currentUser.id,

                post: req.params.postId

            });

            res.status(200).json({ message: "Like removed" });

        } else {

            const newLike = new Like({

                user: req.currentUser.id,

                post: req.params.postId

            });

            await newLike.save();

            res.status(200).json({ message: "Like added" });

        }

    } catch (e) {

        res.status(500).json(e);

    }

};


exports.likeCount = async (req, res) => {

    try {

        const likes = await Like.find({ post: req.params.postId });

        const userLiked = await Like.findOne({

            user: req.currentUser.id,

            post: req.params.postId

        });


        res.status(200).json({

            likes: likes.length,

            userLiked: !!userLiked

        });

    } catch (e) {

        res.status(500).json(e);

    }

};