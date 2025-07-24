'use client';

import { toast, ToastBar, Toaster } from 'react-hot-toast';
import { RiCloseLine } from 'react-icons/ri';

export default function CustomToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 10000,
      }}>
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== 'loading' && (
                <button type="button" onClick={() => toast.dismiss(t.id)}>
                  <RiCloseLine />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
