'use client';

import Toast, {
  ToastProvider,
  ToastViewport,
} from '~/components/ui/Toast/Toast';

import { useToast } from './useToast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider swipeDirection="left">
      {toasts.map(({ id, ...props }) => (
        <Toast key={id} {...props} />
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
