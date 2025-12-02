import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import NotificationToast from '../components/common/NotificationToast';
import IncomingCallModal from '../components/common/IncomingCallModal';
import { useStreamVideo } from './useStreamVideo';
import { useStream } from './useStream';

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const [incomingCall, setIncomingCall] = useState(null);
    const { client: videoClient } = useStreamVideo();

    const addToast = useCallback((message, type = 'info', duration = 5000) => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, message, type, duration }]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const showBrowserNotification = useCallback((title, options) => {
        if (!('Notification' in window)) return;

        if (Notification.permission === 'granted') {
            new Notification(title, options);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    new Notification(title, options);
                }
            });
        }
    }, []);

    useEffect(() => {
        if (!videoClient) return;

        const unsubscribe = videoClient.on('call.ring', async (event) => {
            const {call: eventCall} = event;
            if (eventCall) {
                const call = videoClient.call(eventCall.type, eventCall.id);

                try {
                    await call.get();
                } catch (err) {
                    console.error('Failed to get call data', err);
                }

                setIncomingCall(call);

                const callerName = call.state?.createdBy?.name || call.state?.createdBy?.id || 'Unknown';
                addToast(`Incoming call from ${callerName}`, 'incoming-call', 10000);
                showBrowserNotification('Incoming Call', {
                    body: `${callerName} is calling you...`,
                    icon: '/pulse-logo.png'
                });
            }
        });

        const unsubscribeEnded = videoClient.on('call.ended', () => {
            setIncomingCall(null);
        });

        return () => {
            unsubscribe();
            unsubscribeEnded();
        };
    }, [videoClient, addToast, showBrowserNotification]);

    const { client: chatClient } = useStream();

    useEffect(() => {
        if (!chatClient) return;

        const handleNewMessage = (event) => {
            if (event.user?.id === chatClient.userID) return;

            addToast(`New message from ${event.user?.name || 'Unknown'}`, 'info');

            const settings = JSON.parse(localStorage.getItem('pulseCall_settings') || '{}');
            if (settings.sound !== false) {
                // const audio = new Audio('/sounds/message.mp3');
                // audio.play().catch(e => {});
            }

            if (settings.notifications) {
                showBrowserNotification('New Message', {
                    body: `${event.user?.name || 'Unknown'}: ${event.message?.text || 'Sent an attachment'}`,
                });
            }
        };

        chatClient.on('notification.message_new', handleNewMessage);

        return () => {
            chatClient.off('notification.message_new', handleNewMessage);
        };
    }, [chatClient, addToast, showBrowserNotification]);

    const clearIncomingCall = () => setIncomingCall(null);

    const value = {
        addToast,
        removeToast,
        incomingCall,
        clearIncomingCall,
        showBrowserNotification
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
            <NotificationToast toasts={toasts} removeToast={removeToast} />
            {incomingCall && (
                <IncomingCallModal
                    call={incomingCall}
                    onDecline={clearIncomingCall}
                />
            )}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;
