import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    StreamCall,
    useStreamVideoClient,
    PaginatedGridLayout
} from '@stream-io/video-react-sdk';
import { Chat } from 'stream-chat-react';
import CallControls from '../components/video/CallControls';
import ParticipantTile from '../components/video/ParticipantTile';
import CustomParticipantList from '../components/video/CustomParticipantList';
import { Loader2, AlertCircle } from 'lucide-react';
import '@stream-io/video-react-sdk/dist/css/styles.css';

const VideoCall = () => {
    const { callId } = useParams();
    const navigate = useNavigate();
    const client = useStreamVideoClient();
    const [call, setCall] = useState(null);
    const [error, setError] = useState(null);
    const [showChat, setShowChat] = useState(false);
    const [showParticipants, setShowParticipants] = useState(false);

    const joiningRef = React.useRef(false);

    useEffect(() => {
        if (!client || !callId) return;
        if (call) return;
        if (joiningRef.current) return;

        const joinCall = async () => {
            joiningRef.current = true;
            try {
                const newCall = client.call('default', callId);
                await newCall.join({ create: true });
                setCall(newCall);
            } catch (err) {
                console.error('Error joining call:', err);
                setError(err);
            } finally {
                joiningRef.current = false;
            }
        };

        joinCall();

        return () => {
            if (call) {
                call.leave();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, callId]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
                <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                <h1 className="text-2xl font-bold mb-2">Failed to join call</h1>
                <p className="text-gray-400 mb-6">{error.message || 'Unknown error occurred'}</p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                    Return to Dashboard
                </button>
            </div>
        );
    }

    if (!call) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                <p className="text-xl font-medium animate-pulse">Joining call...</p>
            </div>
        );
    }

    return (
        <StreamCall call={call}>
            <div className="relative w-full h-screen bg-black overflow-hidden flex">
                <div className={`flex-1 relative transition-all duration-300 ${showChat || showParticipants ? 'mr-80' : ''}`}>
                    <div className="w-full h-full p-4">
                        <PaginatedGridLayout
                            groupSize={12}
                            VideoPlaceholder={ParticipantTile}
                        />
                    </div>

                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4">
                        <CallControls
                            onLeave={() => {
                                call.leave();
                                navigate('/dashboard');
                            }}
                            onToggleChat={() => {
                                setShowChat(!showChat);
                                setShowParticipants(false);
                            }}
                            onToggleParticipants={() => {
                                setShowParticipants(!showParticipants);
                                setShowChat(false);
                            }}
                            showChat={showChat}
                            showParticipants={showParticipants}
                        />
                    </div>
                </div>

                {(showChat || showParticipants) && (
                    <div className="absolute right-0 top-0 h-full w-80 bg-gray-900 border-l border-gray-800 z-40 shadow-2xl animate-in slide-in-from-right duration-300">
                        {showChat && (
                            <ChatSidebar callId={callId} />
                        )}
                        {showParticipants && (
                            <div className="h-full flex flex-col">
                                <CustomParticipantList onClose={() => setShowParticipants(false)} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </StreamCall>
    );
};

const ChatSidebar = () => {
    return (
        <div className="h-full flex flex-col bg-gray-900 text-white">
            <div className="p-4 border-b border-gray-800">
                <h3 className="text-white font-semibold">Chat</h3>
            </div>
            <div className="flex-1 flex items-center justify-center text-gray-500">
                Chat integration coming soon...
            </div>
        </div>
    );
};

export default VideoCall;
