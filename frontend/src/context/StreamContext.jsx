import React, { useState, useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { useAuth } from './useAuth';
import api from '../services/api';
import StreamContext from './useStream';
import 'stream-chat-react/dist/css/v2/index.css';

export const StreamProvider = ({ children }) => {
    const { user } = useAuth();
    const [client, setClient] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        const initClient = async () => {
            if (!user) {
                if (client) {
                    await client.disconnectUser();
                    setClient(null);
                }
                return;
            }

            if (client && client.userID === user.id) return;

            setIsConnecting(true);

            try {
                const apiKey = import.meta.env.VITE_STREAM_API_KEY;
                if (!apiKey) {
                    console.error('Stream API Key is missing');
                    return;
                }

                const chatClient = StreamChat.getInstance(apiKey);

                const response = await api.post('/stream/token');
                const {token} = response.data;

                await chatClient.connectUser(
                    {
                        id: user.id || user._id,
                        name: user.username,
                        image: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`,
                    },
                    token
                );

                setClient(chatClient);
            } catch (error) {
                console.error('Failed to connect to Stream Chat:', error);
            } finally {
                setIsConnecting(false);
            }
        };

        initClient();

        return () => {
            if (client) {
                client.disconnectUser();
                setClient(null);
            }
        };
    }, [user, client]);

    return (
        <StreamContext.Provider value={{ client, isConnecting }}>
            {client ? (
                <Chat client={client} theme="str-chat__theme-dark">
                    {children}
                </Chat>
            ) : (
                children
            )}
        </StreamContext.Provider>
    );
};
