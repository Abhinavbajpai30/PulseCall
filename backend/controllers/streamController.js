const { StreamChat } = require('stream-chat');
const User = require('../models/User');

const streamClient = StreamChat.getInstance(
    process.env.STREAM_API_KEY,
    process.env.STREAM_API_SECRET
);

const generateStreamToken = async (req, res) => {
    try {
        const userId = req.user.id;
        const token = streamClient.createToken(userId);
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to generate token' });
    }
};

const createStreamUser = async (req, res) => {
    try {
        const { id, username, email, avatar } = req.user;

        await streamClient.upsertUser({
            id: id.toString(),
            name: username,
            email: email,
            image: avatar
        });

        res.status(200).json({ message: 'User synced with Stream' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to sync user' });
    }
};

const createCall = async (req, res) => {
    try {
        const {type='default',callId,members} = req.body;
        const userId = req.user.id;

        const call = streamClient.video.call(type,callId);

        const callMembers = members ? members.map(id => ({user_id: id})) : [];
        callMembers.push({user_id:userId, role: 'host'});

        await call.create({
            data: {
                created_by_id: userId,
                members: callMembers,
            },
        });

        res.status(200).json({
            callId: call.id,
            type: call.type,
            apiKey: process.env.STREAM_API_KEY
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create call' });
    }
};

const getCallDetails = async (req, res) => {
    try {
        const {callId} = req.params;
        const {type='default'} = req.query;

        const call = streamClient.video.call(type,callId);
        const callData = await call.get();

        res.status(200).json(callData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get call details' });
    }
};

const joinCall = async (req, res) => {
    try {
        const {callId,type='default'} = req.body;
        const userId = req.user.id;

        const call = streamClient.video.call(type,callId);
        const callData = await call.get();

        res.status(200).json({
            message: 'Joined call successfully',
            call: callData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to join call' });
    }
};

module.exports = {
    generateStreamToken,
    createStreamUser,
    createCall,
    getCallDetails,
    joinCall
};
