const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dbUrl = require('./database'); 


const postSchema = new mongoose.Schema({

    // title: {

    //     type: String,

    //     required: true

    // }
    // ,
    
    text: {

        type: String,

        required: true

    }

    ,
    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: 'User',

        required: true

    }
    ,
    region: {

        type: String,

        required: true

    }

    ,
    country: {

        type: String,

        required: true

    }
    
    ,
    steps: {

        type: String,

        required: true

    }

    // ,
    // contents: {

    //     type: String,

    //     required: true

    // }
    ,

     
    post_images: [{

        type: Schema.Types.ObjectId,

        ref: 'Post_Image'

    }]
    

});

module.exports = mongoose.model('Post', postSchema);
