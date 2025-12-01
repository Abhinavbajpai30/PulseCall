import React, { useState } from 'react';
import { useChannelStateContext, useChatContext } from 'stream-chat-react';
import { Phone, Video, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStreamVideo } from '../../context/useStreamVideo';
import { v4 as uuidv4 } from 'uuid';

const ChatHeader = ({ setIsMobileListVisible }) => {
    const { channel } = useChannelStateContext();
    const { client } = useChatContext();
    const navigate = useNavigate();
    const { client: videoClient } = useStreamVideo();
    const [isCalling, setIsCalling] = useState(false);

    const members = Object.values(channel.state.members).filter(
        ({ user }) => user.id !== client.userID
    );
    const displayImage = channel.data.image || (members.length > 0 ? members[0].user.image : null);
    const displayName = channel.data.name || (members.length > 0 ? members[0].user.name : 'Unknown');
    const isOnline = members.length > 0 ? members[0].user.online : false;

    // Typing indicator logic
    const typing = channel.state.typing; // This is an object { userId: { user: ... } }
    const typingUsers = Object.values(typing).filter(t => t.user.id !== client.userID);
    const isTyping = typingUsers.length > 0;

    let status = isOnline ? 'Online' : 'Offline';
    if (isTyping) {
        status = typingUsers.length === 1
            ? `${typingUsers[0].user.name || 'User'} is typing...`
            : 'Multiple people are typing...';
    }

    const handleVideoCall = async () => {
        if (isCalling || !videoClient) return;
        setIsCalling(true);
        try {
            const callId = uuidv4();
            const call = videoClient.call('default', callId);

            // Create call with members
            await call.getOrCreate({
                ring: true,
                data: {
                    members: members.map(m => ({ user_id: m.user.id })),
                },
            });

            navigate(`/video-call/${callId}`);
        } catch (error) {
            console.error('Failed to start call:', error);
        } finally {
            setIsCalling(false);
        }
    };

    return (
        <header className="h-20 px-6 border-b border-white/5 flex items-center justify-between bg-dark-bg/50 backdrop-blur-md z-10">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setIsMobileListVisible && setIsMobileListVisible(true)}
                    className="md:hidden p-2 -ml-2 text-gray-400 hover:text-white"
                >
                    ←
                </button>
                <div className="relative">
                    <img
                        src={displayImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}`}
                        alt={displayName}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    {isOnline && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-dark-bg rounded-full"></div>
                    )}
                </div>
                <div>
                    <h2 className="font-bold text-white">{displayName}</h2>
                    <p className={`text-xs ${isTyping ? 'text-primary animate-pulse' : isOnline ? 'text-green-400' : 'text-gray-500'}`}>
                        {status}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    className="p-2.5 rounded-full text-gray-400 hover:bg-white/5 hover:text-primary transition-colors"
                    title="Voice Call (Coming Soon)"
                >
                    <Phone size={20} />
                </button>
                <button
                    onClick={handleVideoCall}
                    disabled={isCalling}
                    className={`p-2.5 rounded-full text-gray-400 hover:bg-white/5 hover:text-secondary transition-colors ${isCalling ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title="Video Call"
                >
                    <Video size={20} />
                </button>
                <button className="p-2.5 rounded-full text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                    <MoreVertical size={20} />
                </button>
            </div>
        </header>
    );
};

export default ChatHeader;
