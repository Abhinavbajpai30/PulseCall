import React, { useEffect, useRef } from 'react';
import { Phone, PhoneOff, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IncomingCallModal = ({ call, onDecline }) => {
    const navigate = useNavigate();
    const audioRef = useRef(null);

    useEffect(() => {
        // Play ringtone
        // Using a placeholder sound for now. In production, use a local asset.
        // audioRef.current = new Audio('/sounds/ringtone.mp3'); 
        // audioRef.current.loop = true;
        // audioRef.current.play().catch(e => console.log("Audio play failed", e));

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const handleAccept = async () => {
        try {
            // We don't join here, we just navigate to the video call page which handles joining.
            // This prevents double-joining issues.
            navigate(`/video-call/${call.id}`);
            // The modal should be closed by the parent when the call state changes or we navigate
            if (onDecline) onDecline(); // Actually we might not want to decline, but clear the modal state
        } catch (error) {
            console.error('Failed to accept call:', error);
        }
    };

    const handleDecline = async () => {
        try {
            await call.leave({ reject: true });
            if (onDecline) onDecline();
        } catch (error) {
            console.error('Failed to decline call:', error);
        }
    };

    if (!call) return null;

    const caller = call?.state?.createdBy;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 flex flex-col items-center shadow-2xl w-full max-w-md mx-4">
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <img
                        src={caller?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(caller?.name || 'Unknown')}`}
                        alt={caller?.name}
                        className="w-24 h-24 rounded-full border-4 border-blue-500 relative z-10 object-cover"
                    />
                </div >

                <h2 className="text-2xl font-bold text-white mb-2">{caller?.name || 'Unknown'}</h2>
                <p className="text-gray-400 mb-8 flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    Incoming Video Call...
                </p>

                <div className="flex gap-8">
                    <button
                        onClick={handleDecline}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center group-hover:bg-red-500 transition-colors duration-300 border border-red-500">
                            <PhoneOff className="w-6 h-6 text-red-500 group-hover:text-white" />
                        </div>
                        <span className="text-sm text-gray-400 group-hover:text-red-400">Decline</span>
                    </button>

                    <button
                        onClick={handleAccept}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300 border border-green-500 animate-bounce-subtle">
                            <Phone className="w-6 h-6 text-green-500 group-hover:text-white" />
                        </div>
                        <span className="text-sm text-gray-400 group-hover:text-green-400">Accept</span>
                    </button>
                </div>
            </div >
        </div >
    );
};

export default IncomingCallModal;
