import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { MessageCircle, Clock } from 'lucide-react';

const ConversationList = ({ conversations = [], onSelectConversation, activeId }) => {
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (query) => {
        console.log('Searching for:', query);
        // Todo: Replace later with actual data
        if (query) {
            setSearchResults([
                { id: 101, name: 'Alice Johnson', status: 'Online' },
                { id: 102, name: 'Bob Smith', status: 'Offline' }
            ]);
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div className="flex flex-col h-full bg-dark-card/30 backdrop-blur-xl border-r border-white/5">
            <div className="p-4 border-b border-white/5">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <MessageCircle className="text-primary" />
                    Messages
                </h2>
                <SearchBar
                    onSearch={handleSearch}
                    results={searchResults}
                    onSelectResult={(user, type) => console.log(type, user)}
                />
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {conversations.length > 0 ? (
                    <div className="space-y-1 p-2">
                        {conversations.map((conv) => (
                            <div
                                key={conv.id}
                                onClick={() => onSelectConversation(conv)}
                                className={`group p-3 rounded-xl cursor-pointer transition-all duration-200 ${activeId === conv.id
                                        ? 'bg-primary/10 border border-primary/20'
                                        : 'hover:bg-white/5 border border-transparent'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <img
                                            src={conv.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(conv.name)}`}
                                            alt={conv.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        {conv.isOnline && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-dark-card rounded-full"></div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className={`font-medium truncate ${activeId === conv.id ? 'text-primary' : 'text-white group-hover:text-gray-200'}`}>
                                                {conv.name}
                                            </h3>
                                            <span className="text-xs text-gray-500 whitespace-nowrap">
                                                {conv.timestamp}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className={`text-sm truncate ${conv.unread ? 'text-white font-medium' : 'text-gray-400'}`}>
                                                {conv.lastMessage}
                                            </p>
                                            {conv.unread > 0 && (
                                                <span className="ml-2 min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-accent text-white text-xs font-bold rounded-full">
                                                    {conv.unread}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <MessageCircle size={48} className="mb-4 opacity-20" />
                        <p>No conversations yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConversationList;
