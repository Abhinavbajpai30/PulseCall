import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, PhoneIncoming } from 'lucide-react';

const NotificationToast = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
            ))}
        </div>
    );
};

const ToastItem = ({ toast, removeToast }) => {
    const { id, type, message, duration = 5000 } = toast;

    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                removeToast(id);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [id, duration, removeToast]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            case 'incoming-call':
                return <PhoneIncoming className="w-5 h-5 text-blue-500 animate-pulse" />;
            default:
                return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const getBgColor = () => {
        return 'bg-gray-800 border-gray-700 text-white';
    };

    return (
        <div
            className={`pointer-events-auto flex items-start p-4 mb-2 rounded-lg shadow-lg border ${getBgColor()} transform transition-all duration-300 ease-in-out animate-slide-in`}
            role="alert"
        >
            <div className="flex-shrink-0 mr-3 mt-0.5">{getIcon()}</div>
            <div className="flex-1 mr-2">
                <p className="text-sm font-medium">{message}</p>
            </div>
            <button
                onClick={() => removeToast(id)}
                className="flex-shrink-0 ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-white rounded-lg p-1.5 inline-flex h-8 w-8"
                aria-label="Close"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export default NotificationToast;
