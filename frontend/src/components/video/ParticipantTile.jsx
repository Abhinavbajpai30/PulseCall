import React from 'react';
import { ParticipantView, useParticipantViewContext } from '@stream-io/video-react-sdk';
import { Mic, MicOff } from 'lucide-react';

const ParticipantTile = ({ participant }) => {
    const { isLocalParticipant } = useParticipantViewContext();

    if (!participant) return null;

    return (
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-900 border border-gray-800 shadow-lg group">
            <ParticipantView
                participant={participant}
                className="w-full h-full object-cover"
            />

            {/* Overlay info */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 transition-opacity duration-300">
                <span className="text-white text-sm font-medium truncate max-w-[120px]">
                    {participant.name || participant.userId} {isLocalParticipant && '(You)'}
                </span>
                {participant.isSpeaking && (
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                )}
                {!participant.isSpeaking && (
                    <div className={`w-2 h-2 rounded-full ${participant.isMicEnabled ? 'bg-gray-400' : 'bg-red-500'}`} />
                )}
            </div>

            {/* Mic Status Indicator (Top Right) */}
            <div className="absolute top-3 right-3">
                {!participant.isMicEnabled ? (
                    <div className="bg-red-500/80 p-1.5 rounded-full backdrop-blur-sm">
                        <MicOff className="w-4 h-4 text-white" />
                    </div>
                ) : (
                    participant.isSpeaking && (
                        <div className="bg-green-500/80 p-1.5 rounded-full backdrop-blur-sm">
                            <Mic className="w-4 h-4 text-white" />
                        </div>
                    )
                )}
            </div>

            {/* Connection Quality (Optional, if available in participant object) */}
            {/* <div className="absolute top-3 left-3">
          <ConnectionQualityIndicator connectionQuality={participant.connectionQuality} />
      </div> */}
        </div>
    );
};

export default ParticipantTile;
