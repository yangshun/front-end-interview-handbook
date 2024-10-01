import { RiArrowRightLine } from 'react-icons/ri';
import url from 'url';

import { trpc } from '~/hooks/trpc';
import { SCROLL_HASH_PROJECTS_IMAGE_COMPARISON } from '~/hooks/useScrollToHash';

import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import { useI18nRouter } from '~/next-i18nostic/src';

function isOnSubmissionPage(href: string) {
  return window.location.pathname === href;
}

function ViewSubmissionButton({ href }: { href: string }) {
  const intl = useIntl();

  return (
    <Button
      addonPosition="end"
      href={url.format({
        hash: SCROLL_HASH_PROJECTS_IMAGE_COMPARISON,
        pathname: href,
      })}
      icon={RiArrowRightLine}
      label={intl.formatMessage({
        defaultMessage: 'View',
        description: 'Link to a submission page',
        id: 'QB8XoS',
      })}
      size="xs"
      variant="unstyled"
    />
  );
}

export default function useProjectsChallengeSubmissionTakeScreenshotMutation(
  source: 'comparison' | 'form',
  refetchOnError = true,
) {
  const trpcUtils = trpc.useUtils();
  const router = useI18nRouter();
  const { showToast } = useToast();
  const intl = useIntl();

  return trpc.projects.submission.retakeScreenshot.useMutation({
    onError: () => {
      showToast({
        description: (
          <div className="flex items-center gap-3 pt-1">
            <Text className="block" color="inherit" size="inherit">
              <FormattedMessage
                defaultMessage="There were some issues with taking a screenshot for your site. Please try again."
                description="Error message for screenshot generation"
                id="ECojDz"
              />
            </Text>
          </div>
        ),
        title: intl.formatMessage({
          defaultMessage: 'Screenshot failure',
          description: 'Screen failure error title',
          id: 'AeJ6Oz',
        }),
        variant: 'danger',
      });
      trpcUtils.projects.submissions.invalidate();
      // Refetch page data to fetch latest status of screenshot.
      // The user might not be on the submission page but that's ok since this case is quite rare.
      if (refetchOnError) {
        router.refresh();
      }
    },
    onMutate: () => {
      showToast({
        description:
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
        title:
          source === 'form'
            ? intl.formatMessage({
                defaultMessage: 'Generating screenshots',
                description:
                  'Title for project submission screenshot generation',
                id: 'WctnWS',
              })
            : intl.formatMessage({
                defaultMessage: 'Retaking screenshots',
                description:
                  'Title for project submission screenshot generation',
                id: 'TE0JLl',
              }),
        variant: 'info',
      });
    },
    onSuccess: (data) => {
      const onSubmissionPage = isOnSubmissionPage(data.hrefs.detail);

      showToast({
        description: (
          <div className="flex items-center gap-3 pt-1">
            <Text className="block" color="inherit" size="inherit">
              <FormattedMessage
                defaultMessage={`Screenshots for your submission <bold>"{title}"</bold> have been generated.`}
                description="Success message for screenshot generation"
                id="l6Y1+i"
                values={{
                  bold: (chunks) => (
                    <Text color="inherit" size="inherit" weight="bold">
                      {chunks}
                    </Text>
                  ),
                  title: data.title,
                }}
              />
            </Text>
            {!onSubmissionPage && (
              <ViewSubmissionButton href={data.hrefs.detail} />
            )}
          </div>
        ),
        title: intl.formatMessage({
          defaultMessage: 'Screenshot-taking success!',
          description: 'Success message for screenshot generation',
          id: 'VmzkpS',
        }),
        variant: 'success',
      });
      // Refetch submission page data to fetch latest status of screenshot
      if (onSubmissionPage) {
        router.refresh();
      }

      trpcUtils.projects.submissions.invalidate();
    },
  });
}
