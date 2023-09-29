import React, { createContext, useCallback, useContext, useState } from 'react';

import type { ToastMessage } from '~/components/ui/Toast/Toast';
import Toast from '~/components/ui/Toast/Toast';

type Context = Readonly<{
  showToast: (message: ToastMessage) => void;
}>;

export const ToastContext = createContext<Context>({
  showToast: (_: ToastMessage) => {},
});

const getID = (() => {
  let id = 0;

  return () => {
    return id++;
  };
})();

type ToastData = ToastMessage & {
  id: number;
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export function useToast() {
  return useContext(ToastContext);
}

export default function ToastsProvider({ children }: Props) {
  const [toasts, setToasts] = useState<Array<ToastData>>([]);

  const showToast = useCallback(
    ({ title, subtitle, variant, duration, onClose }: ToastMessage) => {
      setToasts((oldToasts) => [
        { duration, id: getID(), onClose, subtitle, title, variant },
        ...oldToasts,
      ]);
    },
    [],
  );

  function closeToast(id: number) {
    setToasts((oldToasts) => {
      const newToasts = oldToasts.filter((toast) => toast.id !== id);

      return newToasts;
    });
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:p-6">
        <div className="flex w-full flex-col items-center space-y-4 sm:items-start">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          {toasts.map(({ id, title, subtitle, variant, onClose }) => (
            <Toast
              key={id}
              subtitle={subtitle}
              title={title}
              variant={variant}
              onClose={() => {
                onClose?.();
                closeToast(id);
              }}
              onExpire={() => {
                closeToast(id);
              }}
            />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}
