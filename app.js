// const mongoose = require('mongoose');

require('dotenv').config();

const express = require ('express');

const path = require('path');

const cors = require('cors');

const morgan = require('morgan');

const bodyParser = require('body-parser');

const mongoose = require('./models/database');

const models = require('./models');

const User = require('./models/user');

const Post = require('./models/post');

const Post_image = require('./models/post_image');

const Comment = require('./models/comment');

const Like = require('./models/like');

const router = require('./routes/index');

// const uploadRouter = require('./routes/UploadRouter');


const app = express();

const port = process.env.PORT || 7000;

// const uri = process.env.MONGODB_URI ;

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('MongoDB connected successfully');
// })
// .catch(err => {
//   console.error('MongoDB connection error:', err);
// });







app.use(cors());


// Middleware setup

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('*/images', express.static(__dirname + '/public/images'));

app.use('/images', express.static(path.join(__dirname, 'public/images')));


// Routes
app.use('/', router);
app.use(express.json());

app.post('/account/register', (req, res) => {
  console.log('Request Body:', req.body); 
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Further validation and user registration logic
  res.status(200).json({ message: 'Registration successful' });
});

// CRUD operations for comments

app.post('/comments', async (req, res) => {
  try {
    const { title, content, userId, region, country, imageIds } = req.body;

    const comment = new Comment({
      title,
      content,
      user: userId,
      region,
      country,
      images: imageIds
    });

    await comment.save();
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find().populate('user').populate('images');
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch('/comments/:id', async (req, res) => {
  try {
    const updates = req.body;
    const comment = await Comment.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

    if (!comment) {
      return res.status(404).send();
    }

    res.status(200).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/comments/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(404).send();
    }

    res.status(200).send(comment);
  } catch (error) {
    res.status(500).send(error);
  }
});




 // Function to create user and post

  async function createUserAndPost() {

    const email = 'john.doe@example.com';


    try {

       
        let user = await User.findOne({ email });


        if (!user) {

          
            user = new User({

                name: 'John Doe',

                email: email,

                password: 'password123',

                image: 'path/to/image.jpg',

                region: 'North America'

            });

            await user.save();

            console.log('User created successfully');

        } else {

            console.log('User already exists');

        }


        const post = new Post({

            title: 'My First Post',

            content: 'This is the content of my first post.',

            text: 'This is the text of my first post.',

            user: user._id,

            region: 'North America',

            country: 'USA',

            steps: 'Step 1, Step 2, Step 3', 
            contents: 'Content 1, Content 2, Content 3' 

        });


        await post.save();

        console.log('Post created successfully');


        const postImage = new Post_image({

            img_uri: 'path/to/post/image.jpg', 

            post: post._id 

        });


        await postImage.save();

        console.log('Post image created successfully');


     
        const like = new Like({

            user: user._id, 

            post: post._id 

        });


        await like.save();

        console.log('Like created successfully');

    } catch (error) {

        console.error('Error creating user or post:', error);

    }

}
createUserAndPost();



app.listen(port, () => {
        
    console.log("Server started on port " + port);

});

 

  

