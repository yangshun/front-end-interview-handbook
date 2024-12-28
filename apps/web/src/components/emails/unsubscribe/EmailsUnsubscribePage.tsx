'use client';

import { useEffect, useState } from 'react';

import { trpc } from '~/hooks/trpc';

import Text from '~/components/ui/Text';

import type { EmailsUnsubscribeFields } from '~/emails/EmailsTypes';

export default function EmailsUnsubscribePage({
  email,
  hash,
  list,
}: EmailsUnsubscribeFields) {
  const [message, setMessage] = useState<
    | { message: string; type: 'error' }
    | { message: string; type: 'success' }
    | null
  >(null);

  const emailUnsubscribeMutation = trpc.emails.unsubscribe.useMutation();

  useEffect(() => {
    emailUnsubscribeMutation.mutateAsync(
      {
        contactListKey: list,
        email,
        hash,
      },
      {
        onError: (error) => {
          setMessage({
            message: error.message,
            type: 'error',
          });
        },
        onSuccess: (data) => {
          setMessage({
            message: data,
            type: 'success',
          });
          // TODO(emails): clear URL params
        },
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="py-10 text-center">
      {message && <Text color={message.type}>{message.message}</Text>}
    </div>
  );
}
