import type { GuideProgress } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import url from 'url';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';

import {
  useMutationGuideProgressAdd,
  useMutationGuideProgressDelete,
} from '~/db/guides/GuidesProgressClient';
import logEvent from '~/logging/logEvent';

import Text from '../ui/Text';
import type { GuideMetadata } from './types';

type Props = Readonly<{
  guideName: string;
  guideProgress?: GuideProgress | null;
  metadata: GuideMetadata;
  studyListKey: string | undefined;
}>;

export default function GuidesProgressAction({
  guideName,
  guideProgress,
  metadata,
  studyListKey,
}: Props) {
  const intl = useIntl();
  const pathname = usePathname();
  const user = useUser();

  const [isLoginDialogShown, setIsLoginDialogShown] = useState(false);
  const addGuideProgressMutation = useMutationGuideProgressAdd();
  const deleteGuideProgressMutation = useMutationGuideProgressDelete();

  const { showToast } = useToast();
  const { signInUpHref, signInUpLabel } = useAuthSignInUp();

  if (user == null) {
    return (
      <>
        <Button
          addonPosition="start"
          icon={FaCheck}
          label={intl.formatMessage({
            defaultMessage: 'Mark complete',
            description: 'Mark guide as complete',
            id: 'Kt8F9D',
          })}
          size="xs"
          variant="secondary"
          onClick={() => setIsLoginDialogShown(true)}
        />
        <Dialog
          isShown={isLoginDialogShown}
          primaryButton={
            <Button
              href={signInUpHref({
                next: url.format({
                  pathname,
                }),
                query: {
                  source: 'track_progress',
                },
              })}
              label={signInUpLabel}
              variant="primary"
              onClick={() => setIsLoginDialogShown(false)}
            />
          }
          secondaryButton={
            <Button
              label={intl.formatMessage({
                defaultMessage: 'Cancel',
                description: 'Cancel and close the sign in modal',
                id: 'YXs0ZC',
              })}
              variant="secondary"
              onClick={() => setIsLoginDialogShown(false)}
            />
          }
          title={intl.formatMessage({
            defaultMessage: 'Sign in to save progress',
            description: 'Instructions for saving platform progress',
            id: 'MaorIw',
          })}
          onClose={() => setIsLoginDialogShown(false)}>
          <Text className="block" color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="Sign into your account or sign up for free to save your progress!"
              description="Instructions for saving platform progress"
              id="ZV4dGC"
            />
          </Text>
        </Dialog>
      </>
    );
  }

  if (guideProgress?.status === 'COMPLETED') {
    return (
      <Button
        icon={FaCheck}
        isDisabled={deleteGuideProgressMutation.isLoading}
        isLoading={deleteGuideProgressMutation.isLoading}
        label={intl.formatMessage({
          defaultMessage: 'Completed',
          description: 'Guide completion label',
          id: '8aakua',
        })}
        size="xs"
        tooltip={intl.formatMessage({
          defaultMessage: 'Mark as incomplete',
          description: 'Mark the guide as incomplete',
          id: 'fFtuJe',
        })}
        tooltipSide="top"
        variant="success"
        onClick={() => {
          deleteGuideProgressMutation.mutate(
            { book: metadata.book, slug: metadata.id },
            {
              onError: () => {
                showToast({
                  title: intl.formatMessage({
                    defaultMessage:
                      'Failed to mark article as not completed. Please try again',
                    description:
                      'Error message shown when the guide cannot be marked incomplete',
                    id: 'OD4lkU',
                  }),
                  variant: 'danger',
                });
              },
              onSuccess: () => {
                showToast({
                  title: intl.formatMessage(
                    {
                      defaultMessage: 'Marked "{articleName}" as incomplete',
                      description:
                        'Success message shown when an article was marked as not completed',
                      id: 'JsjM2e',
                    },
                    {
                      articleName: guideName,
                    },
                  ),
                  variant: 'info',
                });
              },
            },
          );
        }}
      />
    );
  }

  return (
    <Button
      addonPosition="start"
      icon={FaCheck}
      isDisabled={addGuideProgressMutation.isLoading}
      isLoading={addGuideProgressMutation.isLoading}
      label={intl.formatMessage({
        defaultMessage: 'Mark complete',
        description: 'Mark the guide as complete',
        id: 'wLM+DD',
      })}
      size="xs"
      variant="secondary"
      onClick={() => {
        addGuideProgressMutation.mutate({
          book: metadata.book,
          slug: metadata.id,
          studyListKey,
          title: guideName,
        });

        logEvent('guide.mark_complete', {
          book: metadata.book,
          namespace: 'interviews',
          slug: metadata.id,
        });
      }}
    />
  );
}
