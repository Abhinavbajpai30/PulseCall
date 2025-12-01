const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {StreamChat} = require('stream-chat');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username||!email||!password) {
        return res.status(400).json({message: 'Please add all fields'});
    }

    const userExists = await User.findOne({email});

    if (userExists) {
        return res.status(400).json({message: 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    if (user) {
        // Create Stream user
        const serverClient = StreamChat.getInstance(
            process.env.STREAM_API_KEY,
            process.env.STREAM_API_SECRET
        );

        await serverClient.upsertUser({
            id: user._id.toString(),
            name: user.username,
            email: user.email,
        });

        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({message: 'Invalid user data'});
    }
};

const loginUser = async (req, res) => {
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({message: 'Invalid credentials'});
    }
};

const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
