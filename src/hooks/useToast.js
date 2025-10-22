import { useUIStore } from '@store/store';

export const useToast = () => {
  const { addToast, removeToast } = useUIStore();

  const toast = {
    success: (message, duration = 3000) => {
      const id = Date.now();
      addToast({ id, type: 'success', message, duration });
      setTimeout(() => removeToast(id), duration);
    },
    
    error: (message, duration = 3000) => {
      const id = Date.now();
      addToast({ id, type: 'error', message, duration });
      setTimeout(() => removeToast(id), duration);
    },
    
    warning: (message, duration = 3000) => {
      const id = Date.now();
      addToast({ id, type: 'warning', message, duration });
      setTimeout(() => removeToast(id), duration);
    },
    
    info: (message, duration = 3000) => {
      const id = Date.now();
      addToast({ id, type: 'info', message, duration });
      setTimeout(() => removeToast(id), duration);
    },
  };

  return toast;
};

export default useToast;
