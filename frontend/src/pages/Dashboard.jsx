import React, { useState } from 'react';
import { Channel } from 'stream-chat-react';
import Sidebar from '../components/dashboard/Sidebar';
import CustomChannelList from '../components/chat/CustomChannelList';
import ChatWindow from '../components/chat/ChatWindow';
import { Video } from 'lucide-react';
import { useStream } from '../context/useStream';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('chats');
    const { client, isConnecting } = useStream();
    const [activeChannel, setActiveChannel] = useState(null);
    const [isMobileListVisible, setIsMobileListVisible] = useState(true);

    const handleChannelSelect = (channel) => {
        setActiveChannel(channel);
        setIsMobileListVisible(false);
    };

    if (isConnecting) {
        return (
            <div className="flex h-screen items-center justify-center bg-dark-bg text-white">
                Loading Chat...
            </div>
        );
    }

    if (!client) {
        return (
            <div className="flex h-screen items-center justify-center bg-dark-bg text-white">
                Failed to initialize chat.
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-dark-bg overflow-hidden">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className={`w-full md:w-80 lg:w-96 flex-shrink-0 ${!isMobileListVisible ? 'hidden md:flex' : 'flex'}`}>
                <CustomChannelList onChannelSelect={handleChannelSelect} />
            </div>
            <main className={`flex-1 flex flex-col min-w-0 bg-dark-bg relative ${isMobileListVisible ? 'hidden md:flex' : 'flex'}`}>
                {activeChannel ? (
                    <Channel channel={activeChannel}>
                        <ChatWindow setIsMobileListVisible={setIsMobileListVisible} />
                    </Channel>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center mb-8 animate-pulse">
                            <Video className="w-12 h-12 text-white opacity-80" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">PulseCall</span>
                        </h1>
                        <p className="text-gray-400 max-w-md text-lg">
                            Select a conversation to start chatting or initiate a new call with your contacts.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
