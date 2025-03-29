const mongoose = require('mongoose');

const User = require('./user');

const Post = require('./post');

const Post_Image = require('./post_image');

const Comment = require('./comment');

const Like = require('./like');


const models = {

    User: User,

    Post: Post,

    Post_Image: Post_Image,

    Comment: Comment,

    Like: Like  

};


module.exports = models;

