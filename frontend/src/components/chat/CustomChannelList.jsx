import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import { Search, Plus } from 'lucide-react';
import UserSearchModal from './UserSearchModal';

const CustomChannelPreview = (props) => {
    const { channel, activeChannel, setActiveChannel } = props;
    const { client } = useChatContext();

    const isActive = activeChannel?.id === channel.id;
    const unreadCount = channel.countUnread();

    const members = Object.values(channel.state.members).filter(
        ({ user }) => user.id !== client.userID
    );
    const displayImage = channel.data.image || (members.length > 0 ? members[0].user.image : null);
    const displayName = channel.data.name || (members.length > 0 ? members[0].user.name : 'Unknown');
    const isOnline = members.length > 0 ? members[0].user.online : false;

    return (
        <div
            onClick={() => setActiveChannel(channel)}
            className={`flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 border-b border-white/5 hover:bg-white/5 ${isActive ? 'bg-white/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'
                }`}
        >
            <div className="relative">
                <img
                    src={displayImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}`}
                    alt={displayName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-dark-card"
                />
                {isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-dark-card rounded-full"></div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className={`font-semibold truncate ${isActive ? 'text-white' : 'text-gray-200'}`}>
                        {displayName}
                    </h3>
                    <span className="text-xs text-gray-500">
                        {channel.state.last_message_at ? new Date(channel.state.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <p className={`text-sm truncate ${unreadCount > 0 ? 'text-white font-medium' : 'text-gray-400'}`}>
                        {channel.state.messages.length > 0
                            ? channel.state.messages[channel.state.messages.length - 1].text
                            : 'No messages yet'}
                    </p>
                    {unreadCount > 0 && (
                        <span className="ml-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

const CustomChannelList = ({ onChannelSelect }) => {
    const { client } = useChatContext();
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    const filters = { type: 'messaging', members: { $in: [client.userID] } };
    const sort = { last_message_at: -1 };
    const options = { limit: 10 };

    const PreviewWrapper = (props) => {
        const { channel, setActiveChannel } = props;
        const handleSelect = () => {
            setActiveChannel(channel);
            if (onChannelSelect) onChannelSelect(channel);
        };

        return (
            <CustomChannelPreview
                {...props}
                setActiveChannel={handleSelect}
            />
        );
    };

    return (
        <div className="flex flex-col h-full bg-dark-bg border-r border-white/5">
            <div className="p-4 border-b border-white/5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Messages</h2>
                    <button
                        onClick={() => setIsSearchModalOpen(true)}
                        className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300"
                        title="New Chat"
                    >
                        <Plus size={20} />
                    </button>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full bg-dark-card border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <ChannelList
                    filters={filters}
                    sort={sort}
                    options={options}
                    Preview={PreviewWrapper}
                    showChannelSearch={false}
                />
            </div>

            {isSearchModalOpen && (
                <UserSearchModal
                    onClose={() => setIsSearchModalOpen(false)}
                    onUserSelect={(channel) => {
                        if (onChannelSelect) onChannelSelect(channel);
                    }}
                />
            )}
        </div>
    );
};

export default CustomChannelList;
