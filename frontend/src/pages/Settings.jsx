import React, { useState, useEffect } from 'react';
import { Bell, Volume2, Shield, User, Moon, LogOut } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/useAuth';

const Settings = () => {
    const { showBrowserNotification, addToast } = useNotification();
    const { logout, user } = useAuth();

    const [settings, setSettings] = useState({
        notifications: false,
        sound: true,
        darkMode: true,
    });

    useEffect(() => {
        const savedSettings = localStorage.getItem('pulseCall_settings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        } else if (Notification.permission === 'granted') {
            setSettings(prev => ({ ...prev, notifications: true }));
        }
    }, []);

    const handleToggle = (key) => {
        setSettings((prev) => {
            const newSettings = { ...prev, [key]: !prev[key] };
            localStorage.setItem('pulseCall_settings', JSON.stringify(newSettings));

            if (key === 'notifications' && newSettings[key]) {
                if (Notification.permission !== 'granted') {
                    Notification.requestPermission().then(permission => {
                        if (permission === 'granted') {
                            showBrowserNotification('Notifications Enabled', { body: 'You will now receive notifications.' });
                        } else {
                            setSettings(curr => ({ ...curr, notifications: false }));
                            addToast('Notification permission denied', 'error');
                        }
                    });
                }
            }

            return newSettings;
        });
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Settings</h1>
                    <div className="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg border border-gray-700">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold">
                                {user?.username?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">{user?.username || 'User'}</h2>
                                <p className="text-gray-400">{user?.email || 'user@example.com'}</p>
                            </div>
                        </div>
                        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                            Edit Profile
                        </button>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg border border-gray-700">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-blue-500" />
                            Notifications
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 hover:bg-gray-700/50 rounded-lg transition-colors">
                                <div>
                                    <p className="font-medium">Push Notifications</p>
                                    <p className="text-sm text-gray-400">Receive browser notifications for messages and calls</p>
                                </div>
                                <button
                                    onClick={() => handleToggle('notifications')}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${settings.notifications ? 'bg-blue-600' : 'bg-gray-600'
                                        }`}
                                >
                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.notifications ? 'translate-x-6' : 'translate-x-0'
                                        }`} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-3 hover:bg-gray-700/50 rounded-lg transition-colors">
                                <div>
                                    <p className="font-medium">Sound Alerts</p>
                                    <p className="text-sm text-gray-400">Play sounds for incoming messages and calls</p>
                                </div>
                                <button
                                    onClick={() => handleToggle('sound')}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${settings.sound ? 'bg-blue-600' : 'bg-gray-600'
                                        }`}
                                >
                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.sound ? 'translate-x-6' : 'translate-x-0'
                                        }`} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-500">
                            <Shield className="w-5 h-5" />
                            Danger Zone
                        </h3>

                        <div className="space-y-4">
                            <button
                                onClick={logout}
                                className="w-full flex items-center justify-between p-3 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-lg transition-colors"
                            >
                                <span className="flex items-center gap-2">
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </span>
                            </button>

                            <button className="w-full flex items-center justify-between p-3 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-lg transition-colors">
                                <span className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Delete Account
                                </span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Settings;
