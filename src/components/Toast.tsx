import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ type, message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          bgColor: 'bg-green-500',
          textColor: 'text-white',
        };
      case 'error':
        return {
          icon: <XCircle className="h-5 w-5" />,
          bgColor: 'bg-red-500',
          textColor: 'text-white',
        };
      case 'info':
        return {
          icon: <Info className="h-5 w-5" />,
          bgColor: 'bg-blue-500',
          textColor: 'text-white',
        };
    }
  };

  const config = getConfig();

  return (
    <div className={`${config.bgColor} ${config.textColor} rounded-lg shadow-lg p-4 flex items-center space-x-3 min-w-[300px] max-w-md animate-slide-in`}>
      {config.icon}
      <p className="flex-1 font-medium">{message}</p>
      <button onClick={onClose} className="hover:opacity-80 transition-opacity">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
