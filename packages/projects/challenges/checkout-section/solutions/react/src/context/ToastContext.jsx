import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const ToastContext = createContext({
  toast: {
    show: false,
    type: '',
    message: '',
  },
  showToast: () => {},
});

export const useToast = () => {
  const { showToast } = useContext(ToastContext);

  const error = message => showToast('error', message);
  const success = message => showToast('success', message);

  return { error, success };
};

export const useToastContext = () => useContext(ToastContext);

const ToastContextProvider = ({ children }) => {
  const [toast, setToast] = useState({
    show: false,
    type: '',
    message: '',
  });

  const showToast = useCallback((type, message) => {
    setToast({
      show: true,
      type,
      message,
    });
    setTimeout(() => {
      setToast({
        show: false,
        type: '',
        message: '',
      });
    }, 10000);
  }, []);

  const value = useMemo(() => {
    return {
      toast,
      showToast,
    };
  }, [toast, showToast]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export default ToastContextProvider;
