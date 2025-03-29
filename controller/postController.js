const models = require('../models');

const fs = require('fs/promises');

exports.newPost = async (req, res) => {

    const {title, contents, steps, country, region} = req.body;

    const url = req.protocol + '://' + req.get('host'); 

    try { 

        const post = await models.Post({

            title,

            contents,

            steps,

            country,

            region,

            UserId: req.currentUser.id

        });


        await post.save();


        
        const postImagesPromises = req.files.map(async (file) => {

            const postImage = new models.Post_Image({

                img_uri: url + '/public/images/' + file.filename,

                post: post._id 

            });

            await postImage.save();

        });

         
        await Promise.all(postImagesPromises);

        res.status(200).json({message: "A new post has been added"});

    } catch(e) {

        res.status(500).json(e)

    }

}


exports.getAllPosts = async (req, res) => {

    try {

        const getPosts = await models.Post.find()

            .populate({

                path: 'user',

                select: '-password -email'

            })

            .populate('post_images'); 


        res.status(200).json(getPosts);

    } catch (e) {

        res.status(500).json(e);

    }

};


exports.getPost = async (req, res) => {

    try {

        const post = await models.Post.findOne({ _id: req.params.postId })

            .populate({

                path: 'user',

                select: '-password -email'

            })

            .populate('post_images');


        res.status(200).json(post);

    } catch (e) {

        res.status(500).json(e);

    }

};


exports.getMyAllPosts = async (req, res) => {

    try {

        const myPosts = await models.Post.find({ user: req.currentUser.id })

            .populate('post_images');

        res.status(200).json(myPosts);

    } catch (e) {

        res.status(500).json(e);

    }

};


exports.getMyPost = async (req, res) => {

    try {

        const myPost = await models.Post.findOne({

            user: req.currentUser.id,

            _id: req.params.postId

        });

        res.status(200).json(myPost);

    } catch (e) {

        res.status(500).json(e);

    }

};



exports.updateMyPost = async (req, res) => {

    const { title, contents, steps } = req.body;

    try {

        const updatePost = await models.Post.findOneAndUpdate(

            {

                _id: req.params.postId,

                user: req.currentUser.id

            },

            {

                title,

                contents,

                steps

            },

            {

                new: true 

            }

        );


        res.status(200).json({

            message: "The post data has been updated.",

            post: updatePost

        });

    } catch (e) {

        res.status(500).json(e);

    }

};


exports.deleteMyPost = async (req, res) => {

    const { postId } = req.body;

    try {

       
        const postImages = await models.Post_Image.find({ post: postId });

      
        postImages.forEach((img) => {

            fs.unlink('./public/images/' + img.img_uri.split("/")[5], function(err) {

                if (err) throw err;

            });

        });


     
        await models.Post_Image.deleteMany({ post: postId });

        await models.Comment.deleteMany({ post: postId });
        
        await models.Like.deleteMany({ post: postId });

        await models.Post.deleteOne({

            _id: postId,

            user: req.currentUser.id

        });


        res.status(200).json({ message: "Your post has been deleted." });

    } catch (e) {

        res.status(500).json(e);

    }

};

