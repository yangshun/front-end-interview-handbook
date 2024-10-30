import React, { useState } from 'react';
import { RiCheckLine } from 'react-icons/ri';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';

import type { GuideProgress } from '~/db/guides/GuideProgressTypes';
import {
  useMutationGuideProgressAdd,
  useMutationGuideProgressDelete,
} from '~/db/guides/GuidesProgressClient';
import logEvent from '~/logging/logEvent';

import type { GuideMetadata } from './types';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  guideName: string;
  guideProgress?: GuideProgress | null;
  listKey: string | undefined;
  metadata: GuideMetadata;
  signInModalContents?: React.ReactNode;
}>;

export default function GuidesProgressAction({
  guideName,
  signInModalContents,
  guideProgress,
  metadata,
  listKey,
}: Props) {
  const intl = useIntl();
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
          icon={RiCheckLine}
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
              href={signInUpHref()}
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
            description:
              'Message shown when user completes a guide without signing in',
            id: 'mUUWJi',
          })}
          onClose={() => setIsLoginDialogShown(false)}>
          <Text className="block" color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="Congratulations on completing the guide! Sign into your account or sign up for free to save your progress!"
              description="Message shown when user completes a guide"
              id="Z1jeeR"
            />
          </Text>
          {signInModalContents}
        </Dialog>
      </>
    );
  }

  if (guideProgress?.status === 'complete') {
    return (
      <Button
        icon={RiCheckLine}
        isDisabled={deleteGuideProgressMutation.isLoading}
        isLoading={deleteGuideProgressMutation.isLoading}
        label={intl.formatMessage({
          defaultMessage: 'Completed',
          description: 'The guide has been completed',
          id: 'PYCLry',
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
            { category: metadata.category, slug: metadata.slug },
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
                      defaultMessage: 'Marked "{articleName}" as not completed',
                      description:
                        'Success message shown when an article was marked as not completed',
                      id: 'HL6v38',
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
      icon={RiCheckLine}
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
        addGuideProgressMutation.mutate(
          {
            category: metadata.category,
            listKey,
            progressId: guideProgress?.id,
            slug: metadata.slug,
            status: 'complete',
          },
          {
            onError: () => {
              showToast({
                title: intl.formatMessage({
                  defaultMessage:
                    'Failed to mark article as complete. Please try again',
                  description:
                    'Error message shown when a guide has failed to mark as complete',
                  id: '6eVVTu',
                }),
                variant: 'danger',
              });
            },
            onSuccess: () => {
              showToast({
                title: intl.formatMessage(
                  {
                    defaultMessage: 'Marked "{articleName}" as completed',
                    description:
                      'Success message shown when an article was marked as complete',
                    id: 'ctK5lb',
                  },
                  {
                    articleName: guideName,
                  },
                ),
                variant: 'success',
              });
            },
          },
        );
        logEvent('guide.mark_complete', {
          category: metadata.category,
          namespace: 'interviews',
          slug: metadata.slug,
        });
      }}
    />
  );
}
