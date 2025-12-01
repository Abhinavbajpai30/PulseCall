const express = require('express');
const router = express.Router();
const {
    generateStreamToken,
    createCall,
    getCallDetails,
    joinCall
} = require('../controllers/streamController');
const { protect } = require('../middleware/authMiddleware');

router.post('/token', protect, generateStreamToken);
router.post('/call/create', protect, createCall);
router.get('/call/:callId', protect, getCallDetails);
router.post('/call/join', protect, joinCall);

module.exports = router;
