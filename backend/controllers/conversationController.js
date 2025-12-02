const Conversation = require('../models/Conversation');
const User = require('../models/User');

const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            participants: { $in: [req.user.id] }
        })
        .populate('participants', 'username avatar email')
        .sort({updatedAt: -1});

        res.status(200).json(conversations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get conversations' });
    }
};

const createConversation = async (req, res) => {
    try {
        const {participantId} = req.body;

        if (!participantId) {
            return res.status(400).json({message: 'Participant ID is required'});
        }

        const existingConversation = await Conversation.findOne({
            participants: { $all: [req.user.id, participantId] }
        }).populate('participants', 'username avatar email');

        if (existingConversation) {
            return res.status(200).json(existingConversation);
        }

        const newConversation = await Conversation.create({
            participants: [req.user.id, participantId],
            lastMessage: {
                text: '',
                sender: null,
                createdAt: new Date()
            }
        });

        const populatedConversation = await Conversation.findById(newConversation._id)
        .populate('participants', 'username avatar email');

        res.status(201).json(populatedConversation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create conversation' });
    }
};

module.exports = {
    getConversations,
    createConversation
};
