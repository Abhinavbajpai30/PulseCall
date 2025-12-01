import React from 'react';
import { Window, MessageList, MessageInput, Thread } from 'stream-chat-react';
import ChatHeader from './ChatHeader';
import './ChatStyles.css';

const ChatWindow = ({ setIsMobileListVisible }) => {
    return (
        <div className="flex flex-1 h-full overflow-hidden bg-dark-bg relative">
            <Window>
                <ChatHeader setIsMobileListVisible={setIsMobileListVisible} />
                <MessageList />
                <MessageInput focus />
            </Window>
            <Thread />
        </div>
    );
};

export default ChatWindow;
