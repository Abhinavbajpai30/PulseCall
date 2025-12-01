import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';

const UserCard = ({ user, onCall, onMessage }) => {
    const { name, avatar, status, isOnline } = user;

    return (
        <div className="group relative p-4 rounded-xl bg-dark-card border border-white/5 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer overflow-hidden">
            {/* Hover Overlay Actions */}
            <div className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10">
                <button
                    onClick={(e) => { e.stopPropagation(); onCall(user); }}
                    className="p-3 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
                    title="Start Call"
                >
                    <Phone size={20} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onMessage(user); }}
                    className="p-3 rounded-full bg-secondary/20 text-secondary hover:bg-secondary hover:text-white transition-all duration-300 transform hover:scale-110"
                    title="Send Message"
                >
                    <MessageSquare size={20} />
                </button>
            </div>

            <div className="flex items-center gap-4">
                {/* Avatar with Status Ring */}
                <div className="relative">
                    <div className={`w-12 h-12 rounded-full p-[2px] ${isOnline ? 'bg-gradient-to-tr from-green-400 to-emerald-600' : 'bg-gray-700'}`}>
                        <img
                            src={avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`}
                            alt={name}
                            className="w-full h-full rounded-full object-cover border-2 border-dark-card"
                        />
                    </div>
                    {isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-dark-card rounded-full animate-pulse"></div>
                    )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate group-hover:text-primary transition-colors duration-300">
                        {name}
                    </h3>
                    <p className="text-sm text-gray-400 truncate">
                        {status || (isOnline ? 'Online' : 'Offline')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
