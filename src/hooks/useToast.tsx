import { useState, useCallback } from 'react';

interface ToastConfig {
  type: 'success' | 'error' | 'info';
  message: string;
}

export default function useToast() {
  const [toast, setToast] = useState<ToastConfig | null>(null);

  const showToast = useCallback(
    (type: 'success' | 'error' | 'info', message: string) => {
      // ✅ Reset first to allow re-triggering same toast
      setToast(null);

      // Slight delay ensures state updates properly
      setTimeout(() => {
        setToast({ type, message });
      }, 10);
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    toast,
    showToast,
    hideToast,
  };
}