import React from 'react';
import { FaCheck } from 'react-icons/fa6';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useToast } from '~/components/global/toasts/useToast';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

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
}>;

export default function GuidesProgressAction({
  guideName,
  guideProgress,
  metadata,
  listKey,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const addGuideProgressMutation = useMutationGuideProgressAdd();
  const deleteGuideProgressMutation = useMutationGuideProgressDelete();

  const { showToast } = useToast();
  const { signInUpHref } = useAuthSignInUp();

  if (user == null) {
    return (
      <Button
        addonPosition="start"
        href={signInUpHref({
          query: { source: 'track_progress' },
        })}
        icon={FaCheck}
        label={intl.formatMessage({
          defaultMessage: 'Mark complete',
          description: 'Mark guide as complete',
          id: 'Kt8F9D',
        })}
        size="xs"
        variant="secondary"
      />
    );
  }

  if (guideProgress?.status === 'complete') {
    return (
      <Button
        icon={FaCheck}
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
          category: metadata.category,
          guideName,
          listKey,
          progressId: guideProgress?.id,
          slug: metadata.slug,
          status: 'complete',
        });
        logEvent('guide.mark_complete', {
          category: metadata.category,
          namespace: 'interviews',
          slug: metadata.slug,
        });
      }}
    />
  );
}
