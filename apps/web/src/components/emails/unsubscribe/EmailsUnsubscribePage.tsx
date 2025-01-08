'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { RiMailLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import EmptyState from '~/components/ui/EmptyState';
import { themeBorderColor } from '~/components/ui/theme';

import type { EmailsUnsubscribeFields } from '~/emails/EmailsTypes';

export default function EmailsUnsubscribePage({
  email,
  hash,
  list,
  listName,
}: EmailsUnsubscribeFields &
  Readonly<{
    listName: string;
  }>) {
  const [status, setStatus] = useState<
    | { errorMessage?: string; type: 'subscribed' }
    | { errorMessage?: string; type: 'unsubscribed' }
    | { type: 'resubscribed' }
  >({ type: 'subscribed' });

  const emailUnsubscribeMutation = trpc.emails.unsubscribe.useMutation();
  const emailResubscribeMutation = trpc.emails.resubscribe.useMutation();

  return (
    <Container className="py-20 text-center" width="2xl">
      <div className={clsx('py-4', 'rounded-lg', ['border', themeBorderColor])}>
        {status.type === 'subscribed' && (
          <EmptyState
            action={
              <Button
                isDisabled={emailUnsubscribeMutation.isLoading}
                isLoading={emailUnsubscribeMutation.isLoading}
                label="Unsubscribe"
                size="md"
                variant="primary"
                onClick={() => {
                  emailUnsubscribeMutation.mutateAsync(
                    {
                      contactListKey: list,
                      email,
                      hash,
                    },
                    {
                      onError: (error) => {
                        setStatus({
                          errorMessage: error.message,
                          type: 'subscribed',
                        });
                      },
                      onSuccess: () => {
                        setStatus({
                          type: 'unsubscribed',
                        });
                      },
                    },
                  );
                }}
              />
            }
            icon={RiMailLine}
            subtitle={`By clicking "Unsubscribe", you will no longer receive "${listName}" emails. You can resubscribe at anytime`}
            title={`Unsubscribe from "${listName}" emails?`}
          />
        )}
        {status.type === 'unsubscribed' && (
          <EmptyState
            action={
              <Button
                isDisabled={emailResubscribeMutation.isLoading}
                isLoading={emailResubscribeMutation.isLoading}
                label="Resubscribe"
                size="md"
                variant="primary"
                onClick={() => {
                  emailResubscribeMutation.mutateAsync(
                    {
                      contactListKey: list,
                      email,
                      hash,
                    },
                    {
                      onError: (error) => {
                        setStatus({
                          errorMessage: error.message,
                          type: 'unsubscribed',
                        });
                      },
                      onSuccess: () => {
                        setStatus({
                          type: 'resubscribed',
                        });
                      },
                    },
                  );
                }}
              />
            }
            icon={RiMailLine}
            subtitle={`You will no longer receive "${listName}" emails from us. If you've unsubscribed by accident you can resubscribe below`}
            title={`You've unsubscribed`}
          />
        )}
        {status.type === 'resubscribed' && (
          <EmptyState
            icon={RiMailLine}
            subtitle={`You have been resubscribed to "${listName}" emails`}
            title="You've resubscribed"
          />
        )}
      </div>
    </Container>
  );
}
