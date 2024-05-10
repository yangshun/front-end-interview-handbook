import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';

import { useI18nRouter } from '~/next-i18nostic/src';

export default function useProjectsChallengeSubmissionTakeScreenshotMutation(
  source: 'comparison' | 'form',
) {
  const router = useI18nRouter();
  const { showToast } = useToast();
  const intl = useIntl();

  return trpc.projects.submission.retakeScreenshot.useMutation({
    onError: () => {
      showToast({
        description:
          source === 'form'
            ? intl.formatMessage({
                defaultMessage:
                  'Please manually trigger retaking of the screenshots from the submission page',
                description: 'Error message for screenshot generation',
                id: '7khf0o',
              })
            : intl.formatMessage({
                defaultMessage: 'Please try again later',
                description: 'Error message for screenshot generation',
                id: 'AgOTU5',
              }),
        title: intl.formatMessage({
          defaultMessage: 'Screenshot generation failed',
          description: 'Update challenge success message',
          id: 'w0CYrm',
        }),
        variant: 'danger',
      });
      // Refetch submission page data to fetch latest status of screenshot
      router.refresh();
    },
    onMutate: () => {
      showToast({
        title:
          source === 'form'
            ? intl.formatMessage({
                defaultMessage:
                  'Generating screenshots for the submission, it might take a while',
                description:
                  'Message for project submission screenshot generation',
                id: 'WEj+Ko',
              })
            : intl.formatMessage({
                defaultMessage:
                  'Retaking screenshots for the submission, it might take a while',
                description:
                  'Message for project submission screenshot generation',
                id: 'AhoxQ8',
              }),
        variant: 'info',
      });
    },
    onSuccess: () => {
      showToast({
        title: intl.formatMessage({
          defaultMessage: 'Screenshots for the submission have been generated',
          description: 'Success message for screenshot generation',
          id: '97G4Pr',
        }),
        variant: 'success',
      });
      // Refetch submission page data.
      router.refresh();
    },
  });
}
