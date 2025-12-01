const bcrypt = require('bcryptjs');
const User = require('../models/User');

const searchUsers = async (req, res) => {
    try {
        const {query} = req.query;
        if (!query) {
            return res.status(400).json({message: 'Search query is required'});
        }

        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        }).select('-password');

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Failed to search users'});
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Failed to get user profile'});
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            user.avatar = req.body.avatar || user.avatar;

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await user.save();

            res.status(200).json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                avatar: updatedUser.avatar,
            });
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Failed to update profile'});
    }
};

module.exports = {
    searchUsers,
    getUserProfile,
    updateUserProfile
};
