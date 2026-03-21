import Toast from './Toast';

interface ToastContainerProps {
  toast: {
    type: 'success' | 'error' | 'info';
    message: string;
  } | null;
  onClose: () => void;
}

export default function ToastContainer({ toast, onClose }: ToastContainerProps) {
  if (!toast) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Toast type={toast.type} message={toast.message} onClose={onClose} />
    </div>
  );
}
