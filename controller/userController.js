const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user.js');





exports.register = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const hashPassword = await bcrypt.hash(password, 10);

        const findEmail = await User.findOne({ email });


        if (!findEmail) {

            const newUser = new User({

                name,

                email,

                password: hashPassword

            });


            await newUser.save();

            return res.status(201).json({ message: 'User registered successfully' });

        } else {

            return res.status(400).json({ message: 'Email already exists' });

        }

    } catch (e) {

        return res.status(500).json({ message: 'Error registering user', error: e.message });

    }

};

exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({ message: 'The password or email is incorrect' });

        }


        const pass = await bcrypt.compare(password, user.password);

        if (pass) {

            const token = jwt.sign({

                id: user._id,

                email: user.email

            }, process.env.JWT); 


            return res.status(200).json({ accessToken: token });

        } else {

            return res.status(401).json({ message: 'The password or email is incorrect' });

        }

    } catch (e) {

        console.error(`Error logging in: ${e.message}`);

        return res.status(500).json({ message: 'Error logging in', error: e.message });

    }

};

exports.getProfile = async (req, res) => {

    try {

        const user = await User.findOne({ _id: req.currentUser.id }).select('-password');; 


        if (!user) {

            return res.status(404).json({ message: 'User not found' });

        }


        res.status(200).json(user);

    } catch (e) {

        res.status(500).json({ message: 'Error retrieving user profile', error: e.message });
    }

};

exports.uploadUserPhoto = async (req, res) => {

    const url = req.protocol + '://' + req.get('host');

    try {

        const uploadPhoto = await User.findByIdAndUpdate(

            req.currentUser.id,

            {

                img_uri:   url + '/public/images/' + req.file.filename

            },

            { new: true } 

        );


        if (!uploadPhoto) {

            return res.status(404).json({ message: 'Photo not found' });

        }


        res.status(200).json({ message: "The photo has been added successfully.", photo: uploadPhoto });

    } catch (e) {

        res.status(500).json({ message: 'Error updating  photo', error: e.message });

    }

};

exports.updateProfile = async (req, res) => {

    const { name, password } = req.body;

    try {

        const hashPassword = await bcrypt.hash(password, 10);

        const update = await User.findByIdAndUpdate(

            req.currentUser.id,

            {

                name,

                password: hashPassword

            },

            { new: true } 

        );

        res.status(200).json({ message: "Personal data has been modified" });

    } catch (e) {

        res.status(500).json(e);

    }

};
