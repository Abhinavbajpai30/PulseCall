import React from 'react';
import { useCallStateHooks } from '@stream-io/video-react-sdk';
import {
    Mic, MicOff,
    Camera, CameraOff,
    MonitorUp, MonitorOff,
    PhoneOff,
    MessageSquare,
    Users
} from 'lucide-react';

const CallControls = ({onLeave, onToggleChat, onToggleParticipants, showChat, showParticipants}) => {
    const {useMicrophoneState, useCameraState, useScreenShareState} = useCallStateHooks();

    const {microphone, isMute: isMicMuted} = useMicrophoneState();
    const {camera, isMute: isCamMuted} = useCameraState();
    const {screenShare, isMute: isScreenSharing} = useScreenShareState();

    return (
        <div className="flex items-center justify-center gap-4 px-6 py-4 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 hover:bg-black/70">
            <button
                onClick={() => microphone.toggle()}
                className={`p-4 rounded-full transition-all duration-200 ${isMicMuted
                        ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/50'
                        : 'bg-gray-800/50 text-white hover:bg-gray-700/50 border border-white/10'
                    }`}
                title={isMicMuted ? "Unmute" : "Mute"}
            >
                {isMicMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>

            <button
                onClick={() => camera.toggle()}
                className={`p-4 rounded-full transition-all duration-200 ${isCamMuted
                        ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/50'
                        : 'bg-gray-800/50 text-white hover:bg-gray-700/50 border border-white/10'
                    }`}
                title={isCamMuted ? "Turn Camera On" : "Turn Camera Off"}
            >
                {isCamMuted ? <CameraOff className="w-6 h-6" /> : <Camera className="w-6 h-6" />}
            </button>

            <button
                onClick={() => screenShare.toggle()}
                className={`p-4 rounded-full transition-all duration-200 ${isScreenSharing
                        ? 'bg-gray-800/50 text-white hover:bg-gray-700/50 border border-white/10'
                        : 'bg-green-500/20 text-green-500 hover:bg-green-500/30 border border-green-500/50'
                    }`}
                title={isScreenSharing ? "Share Screen" : "Stop Sharing"}
            >
                {isScreenSharing ? <MonitorUp className="w-6 h-6" /> : <MonitorOff className="w-6 h-6" />}
            </button>

            <div className="w-px h-8 bg-white/10 mx-2" />
            <button
                onClick={onToggleChat}
                className={`p-4 rounded-full transition-all duration-200 ${showChat
                        ? 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border border-blue-500/50'
                        : 'bg-gray-800/50 text-white hover:bg-gray-700/50 border border-white/10'
                    }`}
                title="Chat"
            >
                <MessageSquare className="w-6 h-6" />
            </button>
            <button
                onClick={onToggleParticipants}
                className={`p-4 rounded-full transition-all duration-200 ${showParticipants
                        ? 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border border-blue-500/50'
                        : 'bg-gray-800/50 text-white hover:bg-gray-700/50 border border-white/10'
                    }`}
                title="Participants"
            >
                <Users className="w-6 h-6" />
            </button>

            <div className="w-px h-8 bg-white/10 mx-2" />
            <button
                onClick={onLeave}
                className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700 border border-red-500 shadow-lg shadow-red-900/20 transition-all duration-200"
                title="Leave Call"
            >
                <PhoneOff className="w-6 h-6" />
            </button>
        </div>
    );
};

export default CallControls;
