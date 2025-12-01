import React, { useState, useEffect } from 'react';
import { Search, X, MessageSquare } from 'lucide-react';
import api from '../../services/api';
import { useChatContext } from 'stream-chat-react';

const UserSearchModal = ({ onClose, onUserSelect }) => {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { client } = useChatContext();

    useEffect(() => {
        const searchUsers = async () => {
            if (!query.trim()) {
                setUsers([]);
                return;
            }

            setLoading(true);
            try {
                const response = await api.get(`/users/search?query=${query}`);
                // Filter out current user
                const filteredUsers = response.data.filter(u => u._id !== client.userID);
                setUsers(filteredUsers);
            } catch (error) {
                console.error('Failed to search users:', error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(searchUsers, 300);
        return () => clearTimeout(timeoutId);
    }, [query, client.userID]);

    const handleUserSelect = async (selectedUser) => {
        try {
            const channel = client.channel('messaging', {
                members: [client.userID, selectedUser._id],
            });
            await channel.watch();
            onUserSelect(channel);
            onClose();
        } catch (error) {
            console.error('Failed to create channel:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-dark-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white">New Chat</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search users..."
                            className="w-full bg-dark-bg border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
                            autoFocus
                        />
                    </div>

                    <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
                        {loading ? (
                            <div className="text-center py-8 text-gray-500">Searching...</div>
                        ) : users.length > 0 ? (
                            users.map((user) => (
                                <button
                                    key={user._id}
                                    onClick={() => handleUserSelect(user)}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
                                >
                                    <img
                                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`}
                                        alt={user.username}
                                        className="w-10 h-10 rounded-full border border-white/10"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-white font-medium group-hover:text-primary transition-colors">
                                            {user.username}
                                        </h3>
                                        <p className="text-xs text-gray-400">{user.email}</p>
                                    </div>
                                    <MessageSquare size={18} className="text-gray-500 group-hover:text-primary transition-colors" />
                                </button>
                            ))
                        ) : query ? (
                            <div className="text-center py-8 text-gray-500">No users found</div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">Type to search for people</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSearchModal;
