import React, { useState, useEffect } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import { useAuth } from './useAuth';
import api from '../services/api';
import StreamVideoContext from './useStreamVideo';

export const StreamVideoProvider = ({ children }) => {
    const {user} = useAuth();
    const [client, setClient] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        let mounted = true;
        let videoClient;

        const initClient = async () => {
            if (!user) return;

            setIsConnecting(true);

            try {
                const apiKey = import.meta.env.VITE_STREAM_API_KEY;
                if (!apiKey) {
                    console.error('Stream API Key is missing');
                    return;
                }

                const response = await api.post('/stream/token');
                const {token} = response.data;

                const userObj = {
                    id: user.id || user._id,
                    name: user.username,
                    image: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`,
                };

                const client = new StreamVideoClient({ apiKey, user: userObj, token });

                if (mounted) {
                    setClient(client);
                    videoClient = client;
                } else {
                    await client.disconnectUser();
                }
            } catch (error) {
                console.error('Failed to connect to Stream Video:', error);
            } finally {
                if (mounted) setIsConnecting(false);
            }
        };

        initClient();

        return () => {
            mounted = false;
            if (videoClient) {
                videoClient.disconnectUser();
            }
        };
    }, [user]);

    return (
        <StreamVideoContext.Provider value={{client, isConnecting}}>
            {client ? (
                <StreamVideo client={client}>
                    {children}
                </StreamVideo>
            ) : (
                children
            )}
        </StreamVideoContext.Provider>
    );
};
