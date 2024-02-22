import { useToast } from '~/components/global/toasts/useToast';

import { trpc } from '../trpc';

export function useAuthResendSignInConfirmation() {
  const { showToast } = useToast();

  return trpc.auth.resendSignupConfirmation.useMutation({
    onError: (data) => {
      showToast({
        title: data.message,
        variant: 'danger',
      });
    },
    onSuccess: () => {
      showToast({
        title: 'Check your email for the verification link',
        variant: 'success',
      });
    },
  });
}
