import React from 'react';
import { useCallStateHooks } from '@stream-io/video-react-sdk';
import { Users, Mic, MicOff } from 'lucide-react';

const CustomParticipantList = ({ onClose }) => {
    const { useParticipants } = useCallStateHooks();
    const participants = useParticipants();

    return (
        <div className="flex flex-col h-full bg-gray-900 text-white">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    Participants ({participants.length})
                </h3>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    ✕
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                <div className="space-y-2">
                    {participants.map((participant) => (
                        <div
                            key={participant.sessionId}
                            className="flex items-center justify-between p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors border border-gray-700/50"
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img
                                        src={participant.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(participant.name || 'Unknown')}`}
                                        alt={participant.name}
                                        className="w-10 h-10 rounded-full object-cover border border-gray-600"
                                    />
                                    {/* We could add speaking indicator here if available in participant state */}
                                </div>
                                <div>
                                    <p className="font-medium text-sm">
                                        {participant.name || 'Unknown'}
                                        {participant.isLocalParticipant && <span className="text-gray-500 ml-1">(You)</span>}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {participant.roles.includes('host') ? 'Host' : 'Participant'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {participant.isAudioEnabled ? (
                                    <Mic className="w-4 h-4 text-green-500" />
                                ) : (
                                    <MicOff className="w-4 h-4 text-red-500" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomParticipantList;
