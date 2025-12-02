import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Phone, MessageSquare } from 'lucide-react';

const SearchBar = ({ onSearch, results = [], onSelectResult }) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onSearch) onSearch(query);
        }, 300);
        return () => clearTimeout(timer);
    }, [query, onSearch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative z-50" ref={searchRef}>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors duration-300" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-10 py-3 border border-white/10 rounded-xl leading-5 bg-dark-card/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-dark-card focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm transition-all duration-300"
                    placeholder="Search users..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery('');
                            setIsOpen(false);
                        }}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {isOpen && query && (
                <div className="absolute mt-2 w-full bg-dark-card border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {results.length > 0 ? (
                        <ul className="max-h-60 overflow-y-auto py-2">
                            {results.map((user) => (
                                <li key={user.id} className="px-4 py-3 hover:bg-white/5 transition-colors duration-200 group">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                                                alt={user.name}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <div>
                                                <p className="text-sm font-medium text-white">{user.name}</p>
                                                <p className="text-xs text-gray-400">{user.status || 'Available'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <button
                                                onClick={() => onSelectResult(user, 'chat')}
                                                className="p-1.5 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary hover:text-white transition-colors"
                                            >
                                                <MessageSquare size={14} />
                                            </button>
                                            <button
                                                onClick={() => onSelectResult(user, 'call')}
                                                className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                                            >
                                                <Phone size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-4 py-6 text-center text-gray-500 text-sm">
                            No users found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
