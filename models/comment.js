const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const CommentSchema = new Schema({

  text: {

    type: String,

    required: true

  }
  
  ,

  // // content: {

  // //   type: String,

  // //   required: true

  // // },

  user: {

    type: Schema.Types.ObjectId,

    ref: 'User',

    required: true

  },

  post: {

    type: Schema.Types.ObjectId,

    ref: 'Post',

    required: true

  },

  // region: String,

  // country: String,

  images: [{

    type: Schema.Types.ObjectId,

    ref: 'Post_image'

  }]

}, {

  timestamps: true

});


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;