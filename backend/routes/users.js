const express = require('express');
const router = express.Router();
const {
    searchUsers,
    getUserProfile,
    updateUserProfile
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/search', protect, searchUsers);
router.put('/profile', protect, updateUserProfile);
router.get('/:userId', protect, getUserProfile);

module.exports = router;
