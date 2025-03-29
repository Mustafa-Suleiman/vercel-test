const Comment = require('../models/comment'); 

exports.createComment = async (req, res) => {

    const { text } = req.body;

    try {

        const comment = new Comment({

            text,

            post: req.params.postId,

            user: req.currentUser.id

        });


        await comment.save();


        res.status(200).json({ message: "The comment has been added" });

    } catch (e) {

        res.status(500).json(e);

    }

};


exports.getComment = async (req, res) => {

    try {

        const comments = await Comment.find({ post: req.params.postId })

            .populate({

                path: 'user',

                select: '-email -password'

            });


        res.status(200).json(comments);

    } catch (e) {

        res.status(500).json(e);

    }

};
