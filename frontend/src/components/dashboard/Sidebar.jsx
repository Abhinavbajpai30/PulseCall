import React from 'react';
import {
    Home,
    MessageSquare,
    Phone,
    Users,
    Settings,
    LogOut,
    Video
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const { user, logout } = useAuth();

    const navItems = [
        { id: 'chats', icon: MessageSquare, label: 'Chats' },
        { id: 'calls', icon: Phone, label: 'Calls' },
        { id: 'contacts', icon: Users, label: 'Contacts' },
    ];

    return (
        <aside className="hidden md:flex flex-col w-20 lg:w-64 h-full bg-dark-card border-r border-white/5 transition-all duration-300">
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                    <Video className="text-white" size={24} />
                </div>
                <h1 className="hidden lg:block text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    PulseCall
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group ${isActive
                                ? 'bg-primary/10 text-primary'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <Icon size={24} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                            <span className="hidden lg:block font-medium">{item.label}</span>

                            {isActive && (
                                <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-white/5 space-y-2">
                <button className="w-full flex items-center gap-4 p-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-300 group">
                    <Settings size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                    <span className="hidden lg:block font-medium">Settings</span>
                </button>

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-4 p-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
                >
                    <LogOut size={24} />
                    <span className="hidden lg:block font-medium">Logout</span>
                </button>

                {/* User Mini Profile */}
                <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <img
                        src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}`}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-white/10"
                    />
                    <div className="hidden lg:block overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
