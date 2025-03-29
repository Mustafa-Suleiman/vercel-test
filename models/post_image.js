const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const dbUrl = require('./database'); 


    

const post_imageSchema = new Schema({

    img_uri: {

        type: String,

        required: true

    },
    post: {

        type: Schema.Types.ObjectId,

        ref: 'Post',
        
        required: true

    }

    
}, {

    timestamps: true

});




// const Post_image = mongoose.model('Post_image', post_imageSchema);

module.exports = mongoose.model('Post_Image', post_imageSchema);

// module.exports = Post_image;